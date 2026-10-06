import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-user-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-user-page.html',
  styleUrl: './register-user-page.scss'
})
export class RegisterUserPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    preferredSpecies: ['Perro', Validators.required],
    minAgePreference: [1, Validators.required],
    maxAgePreference: [10, Validators.required],
    houseSize: ['Mediana', Validators.required],
    hasYard: [false],
    hoursAvailablePerDay: [2, Validators.required],
    hasPreviousExperience: [false],
    hasSmallChildren: [false],
    hasOtherPets: [false],
    activityLevel: [1, Validators.required]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { password, ...userData } = this.registerForm.getRawValue();

      this.authService.registerUser(userData, password).subscribe({
        next: (res) => {
          alert('¡Éxito! Usuario registrado en Firebase y guardado en MySQL.');
          console.log('Respuesta del Backend:', res);
          this.registerForm.reset();
        },
        error: (err) => {
          alert('Error al registrar: ' + err.message);
          console.error(err);
        }
      });
    }
  }
}
