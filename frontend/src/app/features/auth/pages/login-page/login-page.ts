import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';
import { AlertService } from '../../../../core/services/alert.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  public loadingService = inject(LoadingService);
  private alertService = inject(AlertService);
  private translate = inject(TranslateService);

  userRole: string | null = null;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.loadingService.show();
      const { email, password } = this.loginForm.getRawValue();

      this.authService.login(email, password).subscribe({
        next: (profile) => {
          this.loadingService.hide();
          if (profile.role === 'USER') {
            this.router.navigate(['/user-panel']);
          } else if (profile.role === 'SHELTER') {
            this.router.navigate(['/shelter-panel']);
          }
        },
        error: (err) => {
          this.loadingService.hide();
          if (err.message === 'EMAIL_NOT_VERIFIED') {
            this.alertService.showError(this.translate.instant('AUTH.ALERTS.EMAIL_NOT_VERIFIED'));
          } else {
            this.alertService.showError(this.translate.instant('AUTH.ALERTS.LOGIN_ERROR'));
          }
          console.error(err);
        },
      });
    }
  }
}
