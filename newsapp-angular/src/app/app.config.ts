import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { routes } from './app.routes';

// para que las fechas salgan en español
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // withHashLocation pone un # en la URL (/#/noticias). Sin eso GitHub Pages
    // da error 404 al recargar una ruta interna
    // withComponentInputBinding deja recibir el :id de la ruta como input en el detalle
    provideRouter(routes, withHashLocation(), withComponentInputBinding()),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es' },
  ],
};
