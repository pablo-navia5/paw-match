import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification, signOut,
} from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { from, switchMap, Observable, tap, catchError, throwError } from 'rxjs';
import { UserRegisterRequest, ShelterRegisterRequest, AuthProfile } from '../models/auth.model';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private router = inject(Router);

  currentUser = signal<AuthProfile | null>(this.loadSession());

  registerUser(data: UserRegisterRequest, password: string): Observable<any> {
    const firebaseRegister$ = from(createUserWithEmailAndPassword(this.auth, data.email, password));

    return firebaseRegister$.pipe(
      switchMap((userCredential) => {
        const payload = { ...data, firebaseUid: userCredential.user.uid };
        return this.http.post(`${this.apiUrl}/user/register`, payload).pipe(
          switchMap(async (res) => {
            await sendEmailVerification(userCredential.user);
            return res;
          }),
        );
      }),
    );
  }

  registerShelter(data: ShelterRegisterRequest, password: string): Observable<any> {
    const firebaseRegister$ = from(createUserWithEmailAndPassword(this.auth, data.email, password));

    return firebaseRegister$.pipe(
      switchMap((userCredential) => {
        const payload = { ...data, firebaseUid: userCredential.user.uid };
        return this.http.post(`${this.apiUrl}/shelter/register`, payload).pipe(
          switchMap(async (res) => {
            await sendEmailVerification(userCredential.user);
            return res;
          }),
        );
      }),
    );
  }

  login(email: string, password: string): Observable<AuthProfile> {
    const firebaseLogin$ = from(signInWithEmailAndPassword(this.auth, email, password));

    return firebaseLogin$.pipe(
      switchMap(async (userCredential) => {
        if (!userCredential.user.emailVerified) {
          await signOut(this.auth);
          throw new Error('EMAIL_NOT_VERIFIED');
        }
        return userCredential.user.uid;
      }),
      switchMap((uid) => {
        return this.http.get<AuthProfile>(`${this.apiUrl}/auth/profile/${uid}`);
      }),
      tap((profile) => {
        this.currentUser.set(profile);
        localStorage.setItem('pawmatch_session', JSON.stringify(profile));
      }),
    );
  }

  logout() {
    this.auth.signOut().then(() => {
      this.currentUser.set(null);
      localStorage.removeItem('pawmatch_session');
      this.router.navigate(['']);
    });
  }

  private loadSession(): AuthProfile | null {
    const session = localStorage.getItem('pawmatch_session');
    return session ? JSON.parse(session) : null;
  }
}
