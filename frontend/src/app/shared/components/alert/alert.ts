import { Component, inject } from '@angular/core';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  standalone: true,
  selector: 'app-alert',
  styleUrl: './alert.scss',
  templateUrl: './alert.html',
})
export class AlertComponent {
  protected alertService: AlertService = inject(AlertService);

  alertMessage = this.alertService.alertMessage;

  clearAlert(): void {
    this.alertService.clearAlert();
  }

  protected readonly alert = alert;
}
