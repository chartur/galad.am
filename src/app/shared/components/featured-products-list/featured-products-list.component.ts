import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { Product } from "@interfaces/product";

@Component({
  selector: 'app-featured-products-list',
  templateUrl: './featured-products-list.component.html',
  styleUrls: ['./featured-products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedProductsListComponent {
  @Input() title: string;
  @Input() products: Product[] = [];

  public productsTrackByFn(index: number, product: Product): number {
    return product.id
  }
}
