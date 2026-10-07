import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { InteractionResponse } from '../models/interactionResponse.model';

@Injectable({ providedIn: 'root' })
export class InteractionService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  createInteraction(userId: number, petId: number, interactionType: string) {
    const payload = { userId, petId, interactionType };
    return this.http.post<InteractionResponse>(`${this.apiUrl}/interaction`, payload);
  }
}
