import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { publicPath } from "@environment/environment";

@Directive({
  selector: '[publicSrc]'
})
export class PublicSrcDirective implements OnInit {
  @Input("publicSrc") publicSrc!: string;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.el.nativeElement.src = publicPath(this.publicSrc);
  }
}
