import { Injectable, signal } from '@angular/core';

export type AlertType = 'error' | 'success';

export interface AlertData {
  message: string;
  type: AlertType;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  alertMessage = signal<AlertData | null>(null);
  isClosing = signal(false);
  private timeoutId: any;

  showError(message: string): void {
    this.alertMessage.set({ message, type: 'error' });

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.clearAlert();
    }, 5000);
  }

  showSuccess(message: string): void {
    this.alertMessage.set({ message, type: 'success' });

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.clearAlert();
    }, 5000);
  }

  clearAlert(): void {
    if (!this.alertMessage()) return;

    this.isClosing.set(true);

    setTimeout(() => {
      this.alertMessage.set(null);
      this.isClosing.set(false);
    }, 300);

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
