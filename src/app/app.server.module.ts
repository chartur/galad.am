import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {provideHttpClient, withFetch} from "@angular/common/http";

@NgModule({
  imports: [
    AppModule,
    ServerModule
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
