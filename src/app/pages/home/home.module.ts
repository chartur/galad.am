import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { ComponentsModule } from "@components/components.module";
import { OurFeaturesComponent } from "./components/our-features/our-features.component";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    HomeComponent,
    NewArrivalsComponent,
    CategoriesSectionComponent,
    OurFeaturesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    TranslateModule,
  ]
})
export class HomeModule { }
