import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {authInterceptor} from "./interceptors/auth.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        },

        defaultLanguage: 'kk',
      })
    ]),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
