import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  updateMatchStatus(matchId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/matches/${matchId}/status?status=${status}`, {}, { responseType: 'text' });
  }
}
