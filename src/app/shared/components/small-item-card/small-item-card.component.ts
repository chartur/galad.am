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
  @Input() product: Product;

  constructor(
    public translateService: TranslateService
  ) {
  }

  public get mainPhoto(): ProductAsset {
    return this.product.assets.find((asset) => asset.type === ProductAssetType.Photo && asset.is_main)
  }
}
