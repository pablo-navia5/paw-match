import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './shared/components/alert/alert';
import { TranslateService } from '@ngx-translate/core';

@Component({
  imports: [RouterOutlet, AlertComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');

  constructor(private translate: TranslateService) {
    this.translate.setFallbackLang('es');

    const savedLang = localStorage.getItem('preferredLang') || 'es';
    this.translate.use(savedLang);
  }
}
