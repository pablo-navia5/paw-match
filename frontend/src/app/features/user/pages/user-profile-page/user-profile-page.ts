import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-user-profile-page',
  styleUrl: './user-profile-page.scss',
  templateUrl: './user-profile-page.html',
})
export class UserProfilePageComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  profile = signal<UserProfile | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const session = this.authService.currentUser();

    if (session?.databaseId) {
      this.userService.getUserProfile(session.databaseId).subscribe({
        next: (data) => {
          this.profile.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar el perfil del usuario:', err);
          this.isLoading.set(false);
        },
      });
    } else {
      this.isLoading.set(false);
    }
  }
}
