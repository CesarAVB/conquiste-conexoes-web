import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideSpinnerConfig } from 'ngx-spinner';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';
// TODO: remover DEV_MOCK_PROVIDERS e o import abaixo ao conectar no backend
import { DEV_MOCK_PROVIDERS } from './dev-mocks';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
    provideAnimations(),
    provideHotToastConfig({ position: 'top-right', autoClose: true, duration: 3000 }),
    provideSpinnerConfig({ type: 'ball-clip-rotate' }),
    // TODO: remover bloco abaixo ao conectar no backend
    ...DEV_MOCK_PROVIDERS,
  ]
};