import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

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

  registerForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    contactPhone: ['', Validators.required],
    address: ['', Validators.required],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { password, ...shelterData } = this.registerForm.getRawValue();

      this.authService.registerShelter(shelterData, password).subscribe({
        next: (res) => {
          alert('¡Éxito! Protectora registrada en Firebase y guardada en MySQL.');
          console.log('Respuesta del Backend:', res);
          this.registerForm.reset();
        },
        error: (err) => {
          alert('Error al registrar: ' + err.message);
          console.error(err);
        },
      });
    }
  }
}
