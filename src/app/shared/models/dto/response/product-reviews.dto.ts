import {ProductReview} from "@interfaces/product-review";

export class ProductReviewsDto {
  count: number;

  rating: number;

  reviews: ProductReview[];
}
