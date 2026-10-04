import { Injectable } from '@angular/core';

export type Theme = 'light-theme' | 'dark-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitchService {
  private currentTheme: Theme = 'light-theme';

  switchTheme(theme: Theme) {
    if (theme === 'dark-theme') document.body.classList.add('dark-var');
    if (theme === 'light-theme') document.body.classList.remove('dark-var');
    return this.loadCss(`${theme}.css`, theme).then(() => {
      this.removeTheme(this.currentTheme);
      this.currentTheme = theme;
    });
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');

      link.rel = 'stylesheet';
      link.href = href;
      link.id = id;

      link.onload = resolve;
      link.onerror = reject;

      document.head.appendChild(link);
    });
  }

  private removeTheme(theme: Theme): void {
    const link = document.getElementById(theme);

    if (link) {
      link.remove();
    }
  }
}
