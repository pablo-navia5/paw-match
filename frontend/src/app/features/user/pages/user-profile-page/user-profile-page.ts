import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  standalone: true,
  selector: 'app-user-profile-page',
  styleUrl: './user-profile-page.scss',
  templateUrl: './user-profile-page.html',
})
export class UserProfilePageComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  profile = signal<UserProfile | null>(null);
  isLoading = signal<boolean>(true);
  isSaving = signal<boolean>(false);
  isEditModalOpen = signal<boolean>(false);

  editForm = this.fb.nonNullable.group({
    id: [0],
    name: ['', Validators.required],
    preferredSpecies: ['Cualquiera', Validators.required],
    minAgePreference: [0, [Validators.required, Validators.min(0)]],
    maxAgePreference: [20, [Validators.required, Validators.min(0)]],
    houseSize: ['Pequeña', Validators.required],
    hoursAvailablePerDay: [2, [Validators.required, Validators.min(0)]],
    activityLevel: [2, [Validators.required, Validators.min(1), Validators.max(3)]],
    hasYard: [false],
    hasPreviousExperience: [false],
    hasSmallChildren: [false],
    hasOtherPets: [false],
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile() {
    const session = this.authService.currentUser();
    if (session?.databaseId) {
      this.userService.getUserProfile(session.databaseId).subscribe({
        next: (data) => {
          this.profile.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar el perfil:', err);
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
        preferredSpecies: currentProfile.preferredSpecies || 'Cualquiera',
        minAgePreference: currentProfile.minAgePreference || 0,
        maxAgePreference: currentProfile.maxAgePreference || 20,
        houseSize: currentProfile.houseSize || 'Pequeña',
        hoursAvailablePerDay: currentProfile.hoursAvailablePerDay || 2,
        activityLevel: currentProfile.activityLevel || 2,
        hasYard: currentProfile.hasYard || false,
        hasPreviousExperience: currentProfile.hasPreviousExperience || false,
        hasSmallChildren: currentProfile.hasSmallChildren || false,
        hasOtherPets: currentProfile.hasOtherPets || false,
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

    this.userService.updateUser(updatedData).subscribe({
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
