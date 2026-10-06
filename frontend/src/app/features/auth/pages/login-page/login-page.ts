import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  userRole: string | null = null;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();

      this.authService.login(email, password).subscribe({
        next: (profile) => {
          if (profile.role === 'USER') {
            this.router.navigate(['/user-panel']);
          } else if (profile.role === 'SHELTER') {
            this.router.navigate(['/shelter-panel']);
          }
        },
        error: (err) => {
          alert('Error al iniciar sesión. Comprueba tus credenciales.');
          console.error(err);
        },
      });
    }
  }
}
