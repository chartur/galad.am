import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { Product } from "@interfaces/product";
import { publicPath } from "@environment/environment";

@Component({
  selector: 'app-small-item-card',
  templateUrl: './small-item-card.component.html',
  styleUrls: ['./small-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallItemCardComponent {
  @Input() product: Product;

  public get productImagePath(): string {
    return publicPath(this.product.assets[0].link);
  }
}
