import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { Product } from "@interfaces/product";
import { publicPath } from "@environment/environment";
import {ProductAsset} from "@interfaces/product-asset";
import {ProductAssetType} from "@interfaces/product-asset-type";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-small-item-card',
  templateUrl: './small-item-card.component.html',
  styleUrls: ['./small-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallItemCardComponent {
  @Input() allowPreview: boolean = true;
  @Input() product: Product;
  @Input() showPrice: boolean = true;
  @Input() preventAnimation: boolean = false;

  constructor(
    public translateService: TranslateService
  ) {}
}
