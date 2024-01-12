import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import {FavoritesComponent} from "./favorites.component";
import {ComponentsModule} from "@components/components.module";
import {TranslateModule} from "@ngx-translate/core";
import {PipesModule} from "../../shared/pipes/pipes.module";


@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    ComponentsModule,
    TranslateModule,
    PipesModule
  ]
})
export class FavoritesModule { }
