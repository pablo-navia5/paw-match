import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ShelterService } from '../../service/shelter.service';
import { ShelterProfile } from '../../models/shelter.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-shelter-profile-page',
  styleUrl: './shelter-profile-page.scss',
  templateUrl: './shelter-profile-page.html',
})
export class ShelterProfilePageComponent implements OnInit {
  private authService = inject(AuthService);
  private shelterService = inject(ShelterService);

  profile = signal<ShelterProfile | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
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
}
