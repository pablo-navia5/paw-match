import { Component, inject, OnInit, signal } from '@angular/core';
import { PetService } from '../../../../shared/services/pet.service';
import { PetResponse } from '../../../../shared/models/pet.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-user-dashboard-page',
  styleUrl: './user-dashboard-page.scss',
  templateUrl: './user-dashboard-page.html',
})
export class UserDashboardPageComponent implements OnInit {
  private petService = inject(PetService);
  private authService = inject(AuthService);

  pets = signal<PetResponse[]>([]);
  isLoading = signal<boolean>(true);
  currentIndex = 0;

  get currentPet() {
    return this.pets()[this.currentIndex];
  }

  ngOnInit() {
    const userSession = this.authService.currentUser();

    if (userSession && userSession.databaseId) {
      this.petService.getUserFeed(userSession.databaseId).subscribe({
        next: (data) => {
          this.pets.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al descargar el feed:', err);
          this.isLoading.set(false);
        },
      });
    }
  }

  nextPet(action: 'like' | 'pass') {
    const userSession = this.authService.currentUser();

    if (!userSession || !userSession.databaseId) return;

    const interactionPayload = {
      userId: userSession.databaseId,
      petId: this.currentPet.id,
      interactionType: action,
    };

    this.petService.registerInteraction(interactionPayload).subscribe({
      next: () => {
        this.currentIndex++;
      },
      error: (err) => {
        console.error('Error al registrar la acción:', err);
        if (err.status === 400) {
          alert('Ya habías interactuado con esta mascota.');
          this.currentIndex++;
        }
      },
    });
  }
}
