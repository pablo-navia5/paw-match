import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ShelterService } from '../../service/shelter.service';
import { ShelterProfile } from '../../models/shelter.model';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../../../core/services/loading.service';

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
  public loadingService = inject(LoadingService);

  profile = signal<ShelterProfile | null>(null);
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
        },
        error: (err) => {
          console.error('Error al cargar el perfil de la protectora:', err);
        },
      });
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

    const updatedData = this.editForm.getRawValue();

    this.shelterService.updateShelter(updatedData).subscribe({
      next: () => {
        this.loadProfile();
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Error al actualizar el perfil:', err);
      },
    });
  }
}
