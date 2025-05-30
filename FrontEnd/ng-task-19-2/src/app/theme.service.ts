import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkClass = 'dark';

  constructor() {
    this.initializeTheme();
  }

  initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add(this.darkClass);
    } else {
      document.body.classList.remove(this.darkClass);
    }
  }

  toggleTheme(): void {
    const isDark = document.body.classList.toggle(this.darkClass);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  isDarkMode(): boolean {
    return document.body.classList.contains(this.darkClass);
  }
}
