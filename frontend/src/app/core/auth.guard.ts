import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRole = route.data['role'];

  if (expectedRole && user.role !== expectedRole) {
    const redirectPath = user.role === 'USER' ? '/user-panel' : '/shelter-panel';
    router.navigate([redirectPath]);
    return false;
  }

  return true;
};
