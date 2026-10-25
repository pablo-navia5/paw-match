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
import { ShelterProfilePageComponent } from './features/shelter/pages/shelter-profile-page/shelter-profile-page';
import { UserProfilePageComponent } from './features/user/pages/user-profile-page/user-profile-page';
import { UserMatchesPageComponent } from './features/user/pages/user-matches-page/user-matches-page';

export const routes: Routes = [
  { path: 'login',
    component: LoginPageComponent,
    title: 'PawMatch - Iniciar sesion' },
  {
    path: 'register-user',
    component: RegisterUserPageComponent,
    title: 'PawMatch - Registro usuario',
  },
  {
    path: 'register-shelter',
    component: RegisterShelterPageComponent,
    title: 'PawMatch - Registro protectora',
  },
  { path: '',
    component: HomePageComponent,
    title: 'PawMatch - Adopción de Mascotas'
  },

  {
    path: 'user-panel',
    component: UserDashboardPageComponent,
    canActivate: [authGuard],
    data: { role: 'USER' },
    title: 'PawMatch - Explorar Peludos',
  },
  {
    path: 'user-panel/profile',
    component: UserProfilePageComponent,
    canActivate: [authGuard],
    data: { role: 'USER' },
    title: 'PawMatch - Perfil de usuario',
  },
  {
    path: 'user-panel/matches',
    component: UserMatchesPageComponent,
    canActivate: [authGuard],
    data: { role: 'USER' },
    title: 'PawMatch - Matches del usuario',
  },
  {
    path: 'shelter-panel',
    component: ShelterDashboardPageComponent,
    canActivate: [authGuard],
    data: { role: 'SHELTER' },
    title: 'PawMatch - Mascotas en el sistema',
  },
  {
    path: 'shelter-panel/create-pet',
    component: CreatePetPageComponent,
    canActivate: [authGuard],
    data: { role: 'SHELTER' },
    title: 'PawMatch - Añadir mascota',
  },
  {
    path: 'shelter-panel/matches',
    component: ShelterMatchesPageComponent,
    canActivate: [authGuard],
    data: { role: 'SHELTER' },
    title: 'PawMatch - Matches de protectora',
  },
  {
    path: 'shelter-panel/profile',
    component: ShelterProfilePageComponent,
    canActivate: [authGuard],
    data: { role: 'SHELTER' },
    title: 'PawMatch - Perfil de protectora',
  },
];
