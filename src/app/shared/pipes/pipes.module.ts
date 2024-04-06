import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyTranslatorPipe } from './property-translator.pipe';
import {CustomPricePipe} from "./custom-price.pipe";



@NgModule({
  declarations: [
    PropertyTranslatorPipe,
    CustomPricePipe
  ],
  exports: [
    PropertyTranslatorPipe,
    CustomPricePipe
  ],
  imports: [
    CommonModule,
  ]
})
export class PipesModule { }
