import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ThemeSwitchService, type Theme } from './core/theme-switch.service';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzFloatButtonModule,
    CommonModule,
    RouterLinkWithHref,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  themeSwitchService = inject(ThemeSwitchService);

  swithTheme(theme: Theme) {
    this.themeSwitchService.switchTheme(theme);
  }
}
