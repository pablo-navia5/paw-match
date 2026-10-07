import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatchResponse } from '../models/match.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MatchService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getMatchesForShelter(shelterId: number): Observable<MatchResponse[]> {
    return this.http.get<MatchResponse[]>(`${this.apiUrl}/match/shelter/${shelterId}`);
  }

  updateMatchStatus(matchId: number, status: string) {
    const params = new HttpParams().set('status', status);
    return this.http.patch<void>(`${this.apiUrl}/match/${matchId}/status`, {}, { params });
  }
}
