import { Component, Input } from "@angular/core";
import {Product} from "@interfaces/product";
import {AuthStore} from "@stores/auth.store";
import {map, Observable} from "rxjs";
import {ProductReviewsStore} from "@stores/product-reviews.store";
import {ProductReview} from "@interfaces/product-review";

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: [
    './product-reviews.component.scss'
  ]
})
export class ProductReviewsComponent {
  @Input() product: Product;

  public readonly isLoggedIn$: Observable<boolean> = this.authStore.isLoggedIn$;
  public readonly productReviewLoading$: Observable<boolean> = this.productReviewsStore.loading$;
  public readonly reviews$: Observable<ProductReview[]> = this.productReviewsStore.reviews$;
  public readonly noReviews$: Observable<boolean> = this.reviews$.pipe(
    map(reviews => reviews.length === 0)
  );

  constructor(
    private authStore: AuthStore,
    private productReviewsStore: ProductReviewsStore
  ) {
  }
}
