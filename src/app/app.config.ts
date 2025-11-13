import { ANIMATION_MODULE_TYPE,
         ApplicationConfig,
         provideBrowserGlobalErrorListeners,
         provideZoneChangeDetection
       } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { BrowserAnimationsModule, provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations' },
    provideAnimationsAsync(),provideAnimations(),provideNoopAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      // withInMemoryScrolling({
      //   scrollPositionRestoration: 'top', 
      //   anchorScrolling: 'enabled',
      // })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() , withInterceptors([authInterceptor])),
    
  ]
};
