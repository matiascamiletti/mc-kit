import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    //importProvidersFrom(BrowserAnimationsModule),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
          preset: Aura,
          options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: {
              name: 'primeng',
              order: 'tailwind-base, primeng, tailwind-utilities'
            }
          }
      }
  })
  ]
};
