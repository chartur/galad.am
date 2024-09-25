import { APP_INITIALIZER, NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ComponentsModule } from "@components/components.module";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";

import { AppComponent } from './app.component';
import {selectedLanguage} from "@constants/languages";
import { languageInitializerFactory } from "./factories/language-initializer.factory";
import {ToastrModule} from "ngx-toastr";
import {userLoadInitializerFactory} from "./factories/user-load-initializer.factory";
import {AuthService} from "@services/auth.service";
import {AuthStore} from "@stores/auth.store";
import {provideComponentStore} from "@ngrx/component-store";
import {JwtTokenInterceptor} from "@interceptors/jwt-token.interceptor";
import {LocalStorageService} from "@services/local-storage.service";
import {FavoritesStore} from "@stores/favorites.store";
import {CartStore} from "@stores/cart.store";
import {CookieService} from "ngx-cookie-service";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/');
}

@NgModule({
  declarations: [
      AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    TranslateModule.forRoot({
      useDefaultLang: true,
      defaultLanguage: selectedLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    CookieService,
    provideComponentStore(AuthStore),
    provideComponentStore(FavoritesStore),
    provideComponentStore(CartStore),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtTokenInterceptor,
        deps: [LocalStorageService],
        multi: true,
    },
    {
        provide: APP_INITIALIZER,
        useFactory: languageInitializerFactory,
        deps: [TranslateService],
        multi: true
    },
    {
        provide: APP_INITIALIZER,
        useFactory: userLoadInitializerFactory,
        deps: [AuthService, AuthStore],
        multi: true
    },
    provideHttpClient(
      withInterceptorsFromDi()
    ),
  ]
})
export class AppModule { }
