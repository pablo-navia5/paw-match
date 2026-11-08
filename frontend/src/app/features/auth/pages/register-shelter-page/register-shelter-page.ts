import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-register-shelter-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-shelter-page.html',
  styleUrl: './register-shelter-page.scss',
})
export class RegisterShelterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  public loadingService = inject(LoadingService);

  registerForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    contactPhone: ['', Validators.required],
    address: ['', Validators.required],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      this.loadingService.show();
      const { password, ...shelterData } = this.registerForm.getRawValue();

      this.authService.registerShelter(shelterData, password).subscribe({
        next: (res) => {
          alert('¡Éxito! Revisa tu correo para verificar tu cuenta.');
          console.log('Respuesta del Backend:', res);
          this.loadingService.hide();
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Error al registrar: ' + err.message);
          this.loadingService.hide();
          console.error(err);
        },
      });
    }
  }
}
