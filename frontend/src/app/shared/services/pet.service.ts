import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PetResponse } from '../models/pet.model';
import { InteractionRequest } from '../models/interaction.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getPetsByShelter(shelterId: number): Observable<PetResponse[]> {
    return this.http.get<PetResponse[]>(`${this.apiUrl}/pet/shelter/${shelterId}`);
  }

  createPet(shelterId: number, petData: any): Observable<PetResponse> {
    const payload = { ...petData, shelterId };
    return this.http.post<PetResponse>(`${this.apiUrl}/pet/create`, payload);
  }

  deletePet(petId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pet/${petId}`);
  }

  getUserFeed(userId: number): Observable<PetResponse[]> {
    return this.http.get<PetResponse[]>(`${this.apiUrl}/pet/feed/${userId}`);
  }
}
