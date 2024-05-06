import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideStore} from "@ngrx/store";
import {reducers} from "./store/todo.reducers";
import {TodoEffects} from "./store/todo.effects";
import {provideEffects} from "@ngrx/effects";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {AuthHttpInterceptor, provideAuth0} from '@auth0/auth0-angular';
import {environment} from '../environments/environment';
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";
import {ErrorHandlingInterceptor} from "./error-handling-interceptor.service";

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore(reducers),
    provideEffects([TodoEffects]),
    provideHttpClient(withInterceptorsFromDi()),
    provideAuth0({
        domain: environment.auth.domain,
        clientId: environment.auth.clientId,
        cacheLocation: 'localstorage',
        authorizationParams: {
          redirect_uri: environment.auth.redirectUri,
          cacheLocation: 'localstorage',
          audience: environment.auth.audience,
        },
        httpInterceptor: {
          allowedList: [
            `${environment.apiBaseUrl}`,
            `${environment.apiBaseUrl}/complete`
          ]
        }
      }
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true
    },
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    provideAnimations()
  ]
};

