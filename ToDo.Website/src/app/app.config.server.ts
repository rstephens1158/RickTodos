import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthConfigService, AuthService} from "@auth0/auth0-angular";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: AuthService,
      useValue: {},
    },
    { provide: AuthConfigService,
      useValue: {} as any },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
