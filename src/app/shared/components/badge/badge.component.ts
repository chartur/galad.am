import {Attribute, Component} from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  constructor(
    @Attribute("position") public position: "static" | "absolute" = "static",
    @Attribute("top") public top: string = "initial",
    @Attribute("bottom") public bottom: string = "initial",
    @Attribute("right") public right: string = "initial",
    @Attribute("left") public left: string = "initial",
  ) {}
}
