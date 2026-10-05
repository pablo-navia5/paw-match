import { Component, inject, OnInit, signal } from '@angular/core';
import { PetService } from '../../../../shared/services/pet.service';
import { PetResponse } from '../../../../shared/models/pet.model';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-user-dashboard-page',
  styleUrl: './user-dashboard-page.scss',
  templateUrl: './user-dashboard-page.html',
})
export class UserDashboardPageComponent implements OnInit {
  private petService = inject(PetService);

  pets = signal<PetResponse[]>([]);
  isLoading = signal<boolean>(true);
  currentIndex = 0;

  get currentPet() {
    return this.pets()[this.currentIndex];
  }

  ngOnInit() {
    this.petService.getAllPets().subscribe({
      next: (data) => {
        this.pets.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al descargar las mascotas:', err);
        this.isLoading.set(false);
      }
    });
  }

  nextPet(action: 'like' | 'pass') {
    console.log(`Acción: ${action} a la mascota ID: ${this.currentPet.id}`);
    this.currentIndex++;
  }
}
