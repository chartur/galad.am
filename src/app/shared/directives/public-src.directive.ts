import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { publicPath } from "@environment/environment";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";

@Directive({
  selector: '[publicSrc]'
})
export class PublicSrcDirective implements OnChanges {
  @Input("publicSrc") publicSrc!: string;

  constructor(
    private el: ElementRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.el.nativeElement.src = publicPath(this.publicSrc);
  }
}
