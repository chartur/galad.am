import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ProductPlaceholder} from "@interfaces/product-placeholder";

@Component({
  selector: 'app-featured-products-list',
  templateUrl: './featured-products-list.component.html',
  styleUrls: ['./featured-products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedProductsListComponent {
  @Input() title: string;
  @Input() products: ProductPlaceholder[] = [];

  public productsTrackByFn(index: number, product: ProductPlaceholder): number {
    return product.id
  }
}
