import { Component, inject, OnInit, signal, HostListener } from '@angular/core';
import { PetService } from '../../../../shared/services/pet.service';
import { PetResponse } from '../../../../shared/models/pet.model';
import { AuthService } from '../../../auth/services/auth.service';
import { InteractionService } from '../../../../shared/services/interaction.service';
import { Router, RouterLink } from '@angular/router';
import { ThemeToggle } from '../../../../shared/components/theme-toggle/theme-toggle';
import { LoadingService } from '../../../../core/services/loading.service';
import { AlertService } from '../../../../core/services/alert.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../../../shared/components/language-switcher/language-switcher';

@Component({
  imports: [RouterLink, ThemeToggle, TranslatePipe, LanguageSwitcher],
  standalone: true,
  selector: 'app-user-dashboard-page',
  styleUrl: './user-dashboard-page.scss',
  templateUrl: './user-dashboard-page.html',
})
export class UserDashboardPageComponent implements OnInit {
  private petService = inject(PetService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private interactionService = inject(InteractionService);
  public loadingService = inject(LoadingService);
  private alertService = inject(AlertService);

  isImageLoading = signal<boolean>(true);
  pets = signal<PetResponse[]>([]);
  currentIndex = signal<number>(0);

  showMatchAnimation = signal<boolean>(false);
  matchedPetName = signal<string>('');
  isProfileMenuOpen = signal<boolean>(false);

  get currentPet() {
    return this.pets()[this.currentIndex()];
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen.update((val) => !val);
  }

  ngOnInit() {
    const userSession = this.authService.currentUser();

    if (userSession && userSession.databaseId) {
      this.petService.getUserFeed(userSession.databaseId).subscribe({
        next: (data) => {
          this.pets.set(data);
        },
        error: (err) => {
          this.alertService.showError('Error al cargar las mascotas.');
          console.error('Error al descargar el feed:', err);
        },
      });
    }
  }

  nextPet(action: 'like' | 'pass') {
    const userSession = this.authService.currentUser();

    if (!userSession || !userSession.databaseId) return;

    this.interactionService
      .createInteraction(userSession.databaseId, this.currentPet.id, action)
      .subscribe({
        next: (response) => {
          if (response.hasMatch) {
            this.matchedPetName.set(this.currentPet.name);
            this.showMatchAnimation.set(true);
          } else {
            this.isImageLoading.set(true);
            this.currentIndex.update((i) => i + 1);
          }
        },
        error: (err) => {
          this.alertService.showError('Error al interactuar con la mascota.');
          console.error('Error al registrar la acción:', err);
          if (err.status === 400) {
            this.alertService.showError('Ya has interactuado con esta mascota.');
            this.isImageLoading.set(true);
            this.currentIndex.update((i) => i + 1);
          }
        },
      });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.loadingService.isLoading() || this.showMatchAnimation() || !this.currentPet) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      this.nextPet('pass');
    } else if (event.key === 'ArrowRight') {
      this.nextPet('like');
    }
  }

  closeMatchPopup() {
    this.showMatchAnimation.set(false);
    this.isImageLoading.set(true);
    this.currentIndex.update((i) => i + 1);
  }

  logout() {
    this.authService.logout();
  }

  goToProfile() {
    this.router.navigate(['/user-panel/profile']);
  }

  onImageLoad() {
    this.isImageLoading.set(false);
  }

  getOptimizedImage(url: string | undefined | null, name: string): string {
    if (!url) {
      return `https://placehold.co/600x800/ffefe5/ff7e67?text=${name}`;
    }

    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/c_fill,g_auto,w_600,h_800/');
    }

    return url;
  }
}
