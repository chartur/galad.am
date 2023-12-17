import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftRoutingModule } from './gift-routing.module';
import {GiftComponent} from "./gift.component";
import {ComponentsModule} from "@components/components.module";
@NgModule({
  declarations: [
    GiftComponent
  ],
  imports: [
    CommonModule,
    GiftRoutingModule,
    ComponentsModule
  ]
})
export class GiftModule { }
