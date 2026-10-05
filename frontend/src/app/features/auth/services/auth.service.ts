import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { from, switchMap, Observable } from 'rxjs';
import { UserRegisterRequest, ShelterRegisterRequest } from '../models/auth.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  registerUser(data: UserRegisterRequest, password: string): Observable<any> {
    const firebaseRegister$ = from(createUserWithEmailAndPassword(this.auth, data.email, password));

    return firebaseRegister$.pipe(
      switchMap(userCredential => {
        const payload = {
          ...data,
          firebaseUid: userCredential.user.uid
        };
        return this.http.post(`${this.apiUrl}/user/register`, payload);
      })
    );
  }

  registerShelter(data: ShelterRegisterRequest, password: string): Observable<any> {
    const firebaseRegister$ = from(createUserWithEmailAndPassword(this.auth, data.email, password));

    return firebaseRegister$.pipe(
      switchMap(userCredential => {
        const payload = {
          ...data,
          firebaseUid: userCredential.user.uid
        };
        return this.http.post(`${this.apiUrl}/shelter/register`, payload);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
}
