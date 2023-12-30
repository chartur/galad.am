import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterRoutingModule } from './filter-routing.module';
import {FilterComponent} from "./filter.component";
import {ComponentsModule} from "@components/components.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    FilterRoutingModule,
    ComponentsModule,
    TranslateModule
  ]
})
export class FilterModule { }
