import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyTranslatorPipe } from './property-translator.pipe';



@NgModule({
  declarations: [
    PropertyTranslatorPipe
  ],
  exports: [
    PropertyTranslatorPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
