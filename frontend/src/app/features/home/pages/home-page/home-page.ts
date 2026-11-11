import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from '../../../../shared/components/theme-toggle/theme-toggle';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../../../shared/components/language-switcher/language-switcher';

@Component({
  imports: [RouterLink, ThemeToggle, TranslatePipe, LanguageSwitcher],
  selector: 'app-home-page',
  styleUrl: './home-page.scss',
  templateUrl: './home-page.html',
})
export class HomePageComponent {}
