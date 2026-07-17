import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  // Signal to track the current theme
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      this.setTheme(initialTheme);
    }
  }

  toggleTheme(): void {
    const nextTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
  }

  private setTheme(newTheme: 'light' | 'dark'): void {
    this.theme.set(newTheme);
    if (this.isBrowser) {
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }
}
