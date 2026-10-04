import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { fa_IR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fa from '@angular/common/locales/fa';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';

registerLocaleData(fa);

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: '#4f39f6',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),

    provideNzIcons(icons),
    provideNzI18n(fa_IR),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNzConfig(ngZorroConfig),
    {
      provide: LOCALE_ID,
      useValue: 'fa-IR',
    },
  ],
};
