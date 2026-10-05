import { Routes } from '@angular/router';
import { RegisterUserPageComponent } from './features/auth/pages/register-user-page/register-user-page';
import { RegisterShelterPageComponent } from './features/auth/pages/register-shelter-page/register-shelter-page';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register-user', component: RegisterUserPageComponent },
  { path: 'register-shelter', component: RegisterShelterPageComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
