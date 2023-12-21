import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import {ProfileComponent} from "./profile/profile.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "@components/components.module";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ]
})
export class PortalModule { }
