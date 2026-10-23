import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../../../shared/services/pet.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UploadService } from '../../../../shared/services/upload.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true,
  selector: 'app-create-pet-page',
  styleUrl: './create-pet-page.scss',
  templateUrl: './create-pet-page.html',
})
export class CreatePetPageComponent {
  private fb = inject(FormBuilder);
  private petService = inject(PetService);
  private authService = inject(AuthService);
  private uploadService = inject(UploadService);
  private router = inject(Router);

  selectedFile = signal<File | null>(null);
  imagePreviewUrl = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  petForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    species: ['Perro', Validators.required],
    age: [1, [Validators.required, Validators.min(0)]],
    status: ['Buscando hogar', Validators.required],
    requiredHoursPerDay: [2, [Validators.required, Validators.min(0)]],
    needsYard: [false],
    requiredHouseSize: ['Pequeña', Validators.required],
    requiresExperiencedOwner: [false],
    goodWithChildren: [false],
    goodWithOtherPets: [false],
    energyLevel: [1, Validators.required],
    image: [''],
  });

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);

      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviewUrl.set(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.petForm.valid) {
      this.isLoading.set(true);
      const file = this.selectedFile();

      if (file) {
        this.uploadService.uploadImage(file).subscribe({
          next: (cloudinaryRes) => {
            this.petForm.patchValue({ image: cloudinaryRes.secure_url });
            this.saveToBackend();
          },
          error: (err) => {
            console.error('Error subiendo imagen a Cloudinary:', err);
            this.isLoading.set(false);
          },
        });
      } else {
        this.saveToBackend();
      }
    }
  }

  private saveToBackend() {
    const session = this.authService.currentUser();

    if (session?.databaseId) {
      this.petService.createPet(session.databaseId, this.petForm.getRawValue()).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/shelter-panel']);
        },
        error: (err) => {
          console.error('Error al guardar en BD:', err);
          this.isLoading.set(false);
        },
      });
    } else {
      this.isLoading.set(false);
    }
  }
}
