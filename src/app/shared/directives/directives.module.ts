import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideClickDirective } from './outside-click.directive';



@NgModule({
  declarations: [
    OutsideClickDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OutsideClickDirective
  ]
})
export class DirectivesModule { }
