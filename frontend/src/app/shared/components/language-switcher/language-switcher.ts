import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-language-switcher',
  styleUrl: './language-switcher.scss',
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  isOpen = signal(false);
  currentLang = signal('es');

  languages = [
    { code: 'es', name: 'Español', flagCode: 'es' },
    { code: 'en', name: 'English', flagCode: 'gb' },
    { code: 'pt', name: 'Português', flagCode: 'pt' },
  ];

  constructor(
    private translate: TranslateService,
    private eRef: ElementRef,
  ) {
    this.currentLang.set(this.translate.currentLang() || 'es');
  }

  toggleMenu() {
    this.isOpen.update((val) => !val);
  }

  changeLanguage(code: string) {
    this.translate.use(code);
    this.currentLang.set(code);

    localStorage.setItem('preferredLang', code);

    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  getCurrentFlag(): string {
    return this.languages.find((l) => l.code === this.currentLang())?.flagCode || '🇪🇸';
  }
}
