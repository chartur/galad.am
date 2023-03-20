import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideClickDirective } from './outside-click.directive';
import { PublicSrcDirective } from "@directives/public-src.directive";



@NgModule({
  declarations: [
    OutsideClickDirective,
    PublicSrcDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OutsideClickDirective,
    PublicSrcDirective
  ]
})
export class DirectivesModule { }
