import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClimaService } from './services/clima.service';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),ClimaService ,  importProvidersFrom(
    ModalModule.forRoot(),
    HttpClientModule
  ),]
};
