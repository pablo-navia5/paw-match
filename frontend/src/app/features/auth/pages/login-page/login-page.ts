import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();

      this.authService.login(email, password).subscribe({
        next: (res) => {
          alert('¡Login exitoso! UID: ' + res.user.uid);
          this.loginForm.reset();
        },
        error: (err) => {
          alert('Error al iniciar sesión: ' + err.message);
          console.error(err);
        }
      });
    }
  }
}
