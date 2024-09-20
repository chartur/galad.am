import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {HttpClient, provideHttpClient, withFetch} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {appUrl} from "@environment/environment";
import {defaultLanguage} from "@constants/languages";

export function translateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${appUrl}/assets/i18n/`, '.json');
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: defaultLanguage,
    }),
  ],
  providers: [
    provideClientHydration(
      withEventReplay(),
    ),
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
