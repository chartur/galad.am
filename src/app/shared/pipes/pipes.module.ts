import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyTranslatorPipe } from './property-translator.pipe';
import {CustomPricePipe} from "./custom-price.pipe";
import {PropertyTranslatorCheckPipe} from "./property-translator-check.pipe";



@NgModule({
  declarations: [
    PropertyTranslatorPipe,
    CustomPricePipe,
    PropertyTranslatorCheckPipe
  ],
  exports: [
    PropertyTranslatorPipe,
    CustomPricePipe,
    PropertyTranslatorCheckPipe
  ],
  imports: [
    CommonModule,
  ]
})
export class PipesModule { }
