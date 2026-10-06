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

  setFilter(status: MatchStatus) {
    this.currentFilter.set(status);
  }
}
