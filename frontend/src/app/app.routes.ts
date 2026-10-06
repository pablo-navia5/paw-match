import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { RegisterUserPageComponent } from './features/auth/pages/register-user-page/register-user-page';
import { RegisterShelterPageComponent } from './features/auth/pages/register-shelter-page/register-shelter-page';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page';
import { ShelterDashboardPageComponent } from './features/shelter/pages/shelter-dashboard-page/shelter-dashboard-page';
import { UserDashboardPageComponent } from './features/user/pages/user-dashboard-page/user-dashboard-page';
import { CreatePetPageComponent } from './features/shelter/pages/create-pet-page/create-pet-page';
import { ShelterMatchesPageComponent } from './features/shelter/pages/shelter-matches-page/shelter-matches-page';
import { HomePageComponent } from './features/home/pages/home-page/home-page';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register-user', component: RegisterUserPageComponent },
  { path: 'register-shelter', component: RegisterShelterPageComponent },
  { path: '', component: HomePageComponent },

  {
    path: 'user-panel',
    component: UserDashboardPageComponent,
    canActivate: [authGuard],
    data: {role: 'USER'}
  },
  {
    path: 'shelter-panel',
    component: ShelterDashboardPageComponent,
    canActivate: [authGuard],
    data: {role: 'SHELTER'}
  },
  {
    path: 'shelter-panel/create-pet',
    component: CreatePetPageComponent,
    canActivate: [authGuard],
    data: { role: 'SHELTER' }
  },
  {
    path: 'shelter-panel/matches',
    component: ShelterMatchesPageComponent,
    canActivate: [authGuard],
    data: { role: 'SHELTER' }
  },
];
