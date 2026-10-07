import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatchResponse, MatchStatus } from '../../../../shared/models/match.model';
import { MatchService } from '../../../../shared/services/match.service';
import { AuthService } from '../../../auth/services/auth.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [DecimalPipe, DatePipe, RouterLink],
  standalone: true,
  selector: 'app-shelter-matches-page',
  styleUrl: './shelter-matches-page.scss',
  templateUrl: './shelter-matches-page.html',
})
export class ShelterMatchesPageComponent implements OnInit {
  private matchService = inject(MatchService);
  private authService = inject(AuthService);

  allMatches = signal<MatchResponse[]>([]);
  currentFilter = signal<MatchStatus>('PENDING');
  isLoading = signal<boolean>(true);
  selectedMatch = signal<MatchResponse | null>(null);

  filteredMatches = computed(() => {
    return this.allMatches().filter((match) => match.status === this.currentFilter());
  });

  ngOnInit() {
    this.loadMatches();
  }

  loadMatches() {
    const session = this.authService.currentUser();
    if (session?.databaseId) {
      this.matchService.getMatchesForShelter(session.databaseId).subscribe({
        next: (data) => {
          this.allMatches.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error cargando solicitudes', err);
          this.isLoading.set(false);
        },
      });
    }
  }

  openDetails(match: MatchResponse) {
    this.selectedMatch.set(match);
    document.body.style.overflow = 'hidden';
  }

  closeDetails() {
    this.selectedMatch.set(null);
    document.body.style.overflow = 'auto';
  }

  setFilter(status: MatchStatus) {
    this.currentFilter.set(status);
  }

  checkRequirement(type: string): boolean {
    const match = this.selectedMatch();
    if (!match || !match.pet || !match.applicant) return false;

    const pet = match.pet;
    const user = match.applicant;

    switch (type) {
      case 'houseSize':
        const sizeMap: Record<string, number> = { 'Pequeña': 1, 'Mediana': 2, 'Grande': 3 };
        const pSize = sizeMap[pet.requiredHouseSize || 'Pequeña'] || 1;
        const uSize = sizeMap[user.houseSize || 'Pequeña'] || 1;
        return uSize >= pSize;

      case 'yard':
        return !pet.needsYard || !!user.hasYard;

      case 'hours':
        return (user.hoursAvailablePerDay || 0) >= (pet.requiredHoursPerDay || 0);

      case 'experience':
        return !pet.requiresExperiencedOwner || !!user.hasPreviousExperience;

      case 'children':
        return !pet.goodWithChildren ? !user.hasSmallChildren : true;

      case 'otherPets':
        return !pet.goodWithOtherPets ? !user.hasOtherPets : true;

      case 'energy':
        return (user.activityLevel || 1) >= (pet.energyLevel || 1);

      default:
        return false;
    }
  }
}
