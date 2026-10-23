import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShelterProfile } from '../models/shelter.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getShelterProfile(id: number): Observable<ShelterProfile> {
    return this.http.get<ShelterProfile>(`${this.apiUrl}/shelter/${id}`);
  }

  updateShelter(shelterData: any) {
    return this.http.put(`${this.apiUrl}/shelter/update`, shelterData, { responseType: 'text' });
  }
}
