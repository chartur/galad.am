import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { defaultLanguage } from "./constants/languages";
import { TransferState } from "@angular/platform-browser";
import { httpTranslateLoaderServer } from "./factories/http-translate-loader-server.factory";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderServer,
        deps: [TransferState]
      },
      useDefaultLang: true,
      defaultLanguage: localStorage.getItem("lang") || defaultLanguage
    })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
