import { ANIMATION_MODULE_TYPE,
         ApplicationConfig,
         importProvidersFrom,
         provideBrowserGlobalErrorListeners,
         provideZoneChangeDetection
       } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { sendTokenWithRequestInterceptor } from './core/interceptors/send-token-with-request-interceptor';
import { provideToastr, ToastrModule} from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations' },
    provideAnimationsAsync(),
    provideNoopAnimations(),
    provideToastr({
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
    }),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', 
        anchorScrolling: 'enabled',
      })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() , withInterceptors([sendTokenWithRequestInterceptor])),
    importProvidersFrom(ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut:3000,
      extendedTimeOut:1000,
      tapToDismiss:true,
      toastClass: 'custom-toast toast-success'
    }))
  ]
};
