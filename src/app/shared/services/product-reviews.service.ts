import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ProductReviewsDto} from "@dto/response/product-reviews.dto";
import {Category} from "@interfaces/category";
import {endpoints} from "@environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductReviewsService {
  constructor(
    private httpClient: HttpClient
  ) {}

  public getProductReviews(productId: number): Observable<ProductReviewsDto> {
    return this.httpClient.get<ProductReviewsDto>(
      endpoints.productReviews.getProductReviews.replace(":productId", productId.toString())
    )
  }
}
