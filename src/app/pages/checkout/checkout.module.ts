import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import {CheckoutComponent} from "./checkout.component";
import {ComponentsModule} from "@components/components.module";
import {TranslateModule} from "@ngx-translate/core";
import {PipesModule} from "../../shared/pipes/pipes.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ComponentsModule,
    TranslateModule,
    PipesModule,
    FormsModule
  ]
})
export class CheckoutModule { }
