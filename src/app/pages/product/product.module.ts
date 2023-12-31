import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {ComponentsModule} from "@components/components.module";
import {PipesModule} from "../../shared/pipes/pipes.module";
import {StarRatingModule} from "angular-star-rating";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ComponentsModule,
    PipesModule,
    StarRatingModule.forRoot(),
    TranslateModule,
  ]
})
export class ProductModule { }
