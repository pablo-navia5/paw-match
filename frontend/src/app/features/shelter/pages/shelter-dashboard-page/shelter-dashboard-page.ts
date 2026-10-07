import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { PetService } from '../../../../shared/services/pet.service';
import { PetResponse } from '../../../../shared/models/pet.model';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: 'app-shelter-dashboard-page',
  styleUrl: './shelter-dashboard-page.scss',
  templateUrl: './shelter-dashboard-page.html',
})
export class ShelterDashboardPageComponent implements OnInit {
  private petService = inject(PetService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  shelterName = 'Refugio Esperanza';
  pets = signal<PetResponse[]>([]);
  isLoading = signal<boolean>(true);
  isEditModalOpen = signal<boolean>(false);

  editPetForm = this.fb.nonNullable.group({
    id: [0, Validators.required],
    shelterId: [0, Validators.required],
    name: ['', Validators.required],
    species: ['Perro', Validators.required],
    age: [1, [Validators.required, Validators.min(0)]],
    requiredHoursPerDay: [2, [Validators.required, Validators.min(0)]],
    requiresExperiencedOwner: [false],
    goodWithChildren: [false],
    goodWithOtherPets: [false],
    energyLevel: [1, Validators.required],
    needsYard: [false],
    requiredHouseSize: ['Pequeña', Validators.required],
  });

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
      },
    });
  }

  addNewPet() {
    this.router.navigate(['/shelter-panel/create-pet']);
  }

  goToMatches() {
    this.router.navigate(['/shelter-panel/matches']);
  }

  deletePet(id: number) {
    const confirmacion = confirm('¿Estás seguro de que quieres retirar a esta mascota?');

    if (confirmacion) {
      this.petService.deletePet(id).subscribe({
        next: () => {
          this.pets.update((mascotasActuales) => mascotasActuales.filter((pet) => pet.id !== id));
          alert('Mascota eliminada correctamente.');
        },
        error: (err) => {
          console.error('Error al borrar la mascota:', err);
          alert('Hubo un error al intentar borrar.');
        },
      });
    }
  }

  openEditModal(pet: any) {
    this.editPetForm.patchValue({
      id: pet.id,
      shelterId: pet.shelterId,
      name: pet.name,
      species: pet.species,
      age: pet.age,
      requiredHoursPerDay: pet.requiredHoursPerDay,
      requiresExperiencedOwner: pet.requiresExperiencedOwner,
      goodWithChildren: pet.goodWithChildren,
      goodWithOtherPets: pet.goodWithOtherPets,
      energyLevel: pet.energyLevel,
      needsYard: pet.needsYard,
      requiredHouseSize: pet.requiredHouseSize,
    });

    this.isEditModalOpen.set(true);
  }

  closeEditModal() {
    this.isEditModalOpen.set(false);
    this.editPetForm.reset();
  }

  onSubmitEdit() {
    if (this.editPetForm.valid) {
      const updatedPetData = this.editPetForm.getRawValue();

      this.petService.updatePet(updatedPetData).subscribe({
        next: (response) => {
          console.log('Actualizado:', response);
          this.closeEditModal();
          const userSession = this.authService.currentUser();

          if (userSession && userSession.databaseId) {
            this.loadPets(userSession.databaseId);
          } else {
            this.isLoading.set(false);
          }
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
        },
      });
    }
  }
}
