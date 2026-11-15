import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PetService } from '../../../../shared/services/pet.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UploadService } from '../../../../shared/services/upload.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { AlertService } from '../../../../core/services/alert.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
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
  public loadingService = inject(LoadingService);
  private alertService = inject(AlertService);
  private translate = inject(TranslateService)

  selectedFiles = signal<{ file: File; preview: string }[]>([]);

  petForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    species: ['Perro', Validators.required],
    age: [1, [Validators.required, Validators.min(0)]],
    status: ['AVAILABLE'],
    requiredHoursPerDay: [2, [Validators.required, Validators.min(0)]],
    needsYard: [false],
    requiredHouseSize: ['Pequeña', Validators.required],
    requiresExperiencedOwner: [false],
    goodWithChildren: [false],
    goodWithOtherPets: [false],
    energyLevel: [1, Validators.required],
    description: ['', [Validators.required, Validators.maxLength(600)]],
  });

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      const currentFiles = this.selectedFiles();
      const slotsAvailable = 5 - currentFiles.length;

      if (files.length > slotsAvailable) {
        this.alertService.showError(this.translate.instant('SHELTER.ALERTS.MAX_PHOTOS'));
      }

      const filesToAdd = Array.from(files).slice(0, slotsAvailable) as File[];

      filesToAdd.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.update((current) => [...current, { file, preview: e.target.result }]);
        };
        reader.readAsDataURL(file);
      });

      event.target.value = '';
    }
  }

  removePhoto(index: number) {
    this.selectedFiles.update((current) => current.filter((_, i) => i !== index));
  }

  onSubmit() {
    if (this.petForm.valid && this.selectedFiles().length > 0) {
      const uploadObservables = this.selectedFiles().map((item) =>
        this.uploadService.uploadImage(item.file),
      );

      forkJoin(uploadObservables).subscribe({
        next: (responses: any[]) => {
          const imageUrls = responses.map(res => res.secure_url);
          this.saveToBackend(imageUrls);
        },
        error: (err) => {
          console.error('Error subiendo imágenes a Cloudinary:', err);
          this.alertService.showError(this.translate.instant('SHELTER.ALERTS.UPLOAD_PHOTOS_ERROR'));
        },
      });
      } else {
        this.alertService.showError(this.translate.instant('SHELTER.ALERTS.INVALID_ADD_FORM'));
      }
  }

  private saveToBackend(imageUrls: string[]) {
    const session = this.authService.currentUser();

    if (session?.databaseId) {
      const petData = {
        ...this.petForm.getRawValue(),
        photos: imageUrls,
      };

      this.petService.createPet(session.databaseId, petData).subscribe({
        next: () => {
          this.alertService.showSuccess(this.translate.instant('SHELTER.ALERTS.SUCCESS_CREATED'));
          this.router.navigate(['/shelter-panel']);
        },
        error: (err) => {
          console.error('Error al guardar en BD:', err);
          this.alertService.showError(this.translate.instant('SHELTER.ALERTS.ERROR_CREATED'));
        },
      });
    }
  }
}
