import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { PetService } from '../../service/pet.service';
import { PetResponse } from '../../models/pet.model';
import { Router } from '@angular/router';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-shelter-dashboard-page',
  styleUrl: './shelter-dashboard-page.scss',
  templateUrl: './shelter-dashboard-page.html',
})
export class ShelterDashboardPageComponent implements OnInit {
  private petService = inject(PetService);
  private authService = inject(AuthService);
  private router = inject(Router);

  shelterName = 'Refugio Esperanza';
  pets = signal<PetResponse[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    const userSession = this.authService.currentUser();

    if (userSession && userSession.databaseId) {
      this.loadPets(userSession.databaseId);
    } else {
      this.isLoading.set(false);
    }
  }

  loadPets(shelterId: number) {
    this.isLoading.set(true);
    this.petService.getPetsByShelter(shelterId).subscribe({
      next: (data) => {
        this.pets.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al descargar las mascotas de Spring Boot:', err);
        this.isLoading.set(true);
      }
    });
  }

  addNewPet() {
    this.router.navigate(['/shelter-panel/create-pet']);
  }

  deletePet(id: number) {
    console.log('Eliminar mascota con ID:', id);
    alert('Próximamente: Llamada al backend para borrar mascota.');
  }
}
