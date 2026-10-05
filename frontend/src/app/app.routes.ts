import { Routes } from '@angular/router';
import { RegisterUserPageComponent } from './features/auth/pages/register-user-page/register-user-page';
import { RegisterShelterPageComponent } from './features/auth/pages/register-shelter-page/register-shelter-page';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page';
import { ShelterDashboardPage } from './features/shelter/pages/shelter-dashboard-page/shelter-dashboard-page';
import { UserDashboardPage } from './features/user/pages/user-dashboard-page/user-dashboard-page';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register-user', component: RegisterUserPageComponent },
  { path: 'register-shelter', component: RegisterShelterPageComponent },

  { path: 'user-panel', component: UserDashboardPage },
  { path: 'shelter-panel', component: ShelterDashboardPage },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
