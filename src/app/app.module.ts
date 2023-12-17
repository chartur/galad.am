import { APP_INITIALIZER, NgModule, TransferState } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ComponentsModule } from "@components/components.module";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";


import { AppComponent } from './app.component';
import { defaultLanguage } from "@constants/languages";
import { languageInitializerFactory } from "./factories/language-initializer.factory";
import { translateBrowserLoaderFactory } from "./factories/http-translate-loader.factory";
import {ToastrModule} from "ngx-toastr";
import {userLoadInitializerFactory} from "@factories/user-load-initializer.factory";
import {AuthService} from "@services/auth.service";
import {AuthStore} from "@stores/auth.store";
import {provideComponentStore} from "@ngrx/component-store";
import {JwtTokenInterceptor} from "@interceptors/jwt-token.interceptor";
import {LocalStorageService} from "@services/local-storage.service";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      },
      useDefaultLang: true,
      defaultLanguage: localStorage.getItem("lang") || defaultLanguage
    }),
    ToastrModule.forRoot(),

  ],
  providers: [
    provideComponentStore(AuthStore),
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
