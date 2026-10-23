import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ShelterService } from '../../service/shelter.service';
import { ShelterProfile } from '../../models/shelter.model';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  standalone: true,
  selector: 'app-shelter-profile-page',
  styleUrl: './shelter-profile-page.scss',
  templateUrl: './shelter-profile-page.html',
})
export class ShelterProfilePageComponent implements OnInit {
  private authService = inject(AuthService);
  private shelterService = inject(ShelterService);
  private fb = inject(FormBuilder);

  profile = signal<ShelterProfile | null>(null);
  isLoading = signal<boolean>(true);
  isSaving = signal<boolean>(false);
  isEditModalOpen = signal<boolean>(false);

  editForm = this.fb.nonNullable.group({
    id: [0],
    name: ['', Validators.required],
    contactPhone: [''],
    address: [''],
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile() {
    const session = this.authService.currentUser();
    if (session?.databaseId) {
      this.shelterService.getShelterProfile(session.databaseId).subscribe({
        next: (data) => {
          this.profile.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar el perfil de la protectora:', err);
          this.isLoading.set(false);
        },
      });
    } else {
      this.isLoading.set(false);
    }
  }

  openEditModal() {
    const currentProfile = this.profile();
    if (currentProfile) {
      this.editForm.patchValue({
        id: currentProfile.id,
        name: currentProfile.name,
        contactPhone: currentProfile.contactPhone || '',
        address: currentProfile.address || '',
      });
      this.isEditModalOpen.set(true);
    }
  }

  closeEditModal() {
    this.isEditModalOpen.set(false);
  }

  onSubmitEdit() {
    if (this.editForm.invalid) return;

    this.isSaving.set(true);
    const updatedData = this.editForm.getRawValue();

    this.shelterService.updateShelter(updatedData).subscribe({
      next: () => {
        this.loadProfile();
        this.isSaving.set(false);
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Error al actualizar el perfil:', err);
        this.isSaving.set(false);
      },
    });
  }
}
