import {Injectable} from "@angular/core";
import {ProductReview} from "@interfaces/product-review";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {Observable, switchMap, tap} from "rxjs";
import {ProductReviewsService} from "@services/product-reviews.service";
import {ProductReviewsDto} from "@dto/response/product-reviews.dto";
import {ToastrService} from "ngx-toastr";

interface ProductReviewsState {
  count: number;
  rating: number;
  reviews: ProductReview[]
  loading: boolean,
  error: unknown,
}

const initialState: ProductReviewsState = {
  count: 0,
  rating: 0,
  reviews: [],
  loading: false,
  error: null
}

@Injectable({
  providedIn: "root"
})
export class ProductReviewsStore extends ComponentStore<ProductReviewsState> {
  public readonly count$: Observable<number> = this.select((state) => state.count);
  public readonly rating$: Observable<number> = this.select((state) => state.rating);
  public readonly reviews$: Observable<ProductReview[]> = this.select((state) => state.reviews);
  public readonly loading$: Observable<boolean> = this.select((state) => state.loading);

  private readonly setLoadingState = this.updater((state, payload: boolean) => ({
    ...state,
    loading: payload
  }));
  private readonly setDateSuccess = this.updater((state, payload: ProductReviewsDto) => ({
    ...state,
    ...payload,
    loading: false,
    error: undefined,
  }));
  private readonly setDateFailure = this.updater((state, error: unknown) => ({
    ...state,
    error,
    reviews: [],
    count: 0,
    rating: 0,
    loading: false,
  }));

  public readonly getByProductId = this.effect((body$: Observable<number>) => {
    return body$.pipe(
      tap(() => this.setLoadingState(true)),
      switchMap((productId) => this.productReviewsService.getProductReviews(productId).pipe(
        tapResponse(
          (response) => {
            this.setDateSuccess(response)
          },
          (error) => {
            this.toastrService.error("Unable to load product reviews");
            this.setDateFailure(error)
          }
        )
      ))
    )
  })

  constructor(
    private productReviewsService: ProductReviewsService,
    private toastrService: ToastrService
  ) {
    super(initialState);
  }
}
