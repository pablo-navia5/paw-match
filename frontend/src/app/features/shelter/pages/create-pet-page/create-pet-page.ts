import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../../../shared/services/pet.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: 'app-create-pet-page',
  styleUrl: './create-pet-page.scss',
  templateUrl: './create-pet-page.html',
})
export class CreatePetPageComponent {
  private fb = inject(FormBuilder);
  private petService = inject(PetService);
  private authService = inject(AuthService);
  private router = inject(Router);

  petForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    species: ['Perro', Validators.required],
    age: [1, [Validators.required, Validators.min(0)]],
    status: ['Buscando hogar', Validators.required],
    requiredHoursPerDay: [false],
    requiresExperiencedOwner: [false],
    goodWithChildren: [false],
    goodWithOtherPets: [false],
    energyLevel: [1, Validators.required]
  });

  onSubmit() {
    if (this.petForm.valid) {
      const session = this.authService.currentUser();

      if (session?.databaseId) {
        this.petService.createPet(session.databaseId, this.petForm.getRawValue()).subscribe({
          next: () => {
            this.router.navigate(['/shelter-panel']);
          },
          error: (err) => console.error('Error al guardar:', err),
        });
      }
    }
  }
}
