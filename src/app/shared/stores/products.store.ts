import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Category } from "@interfaces/category";
import { Observable, switchMap, tap } from "rxjs";
import { ProductsService } from "@services/products.service";
import { Product } from "@interfaces/product";

interface ProductsState {
  products: Product[],
  relatedProducts: {
    data: Product[],
    loading: boolean,
    error: unknown
  },
  product: {
    data: Product,
    loading: boolean,
    error: unknown
  },
  newArrivals: {
    data: Category[],
    error: unknown,
    loading: boolean
  },
}

const initialState: ProductsState = {
  products: [],
  relatedProducts: {
    data: [],
    loading: false,
    error: null,
  },
  product: {
    data: null,
    loading: false,
    error: null,
  },
  newArrivals: {
    data: [],
    error: null,
    loading: false
  },
}

@Injectable({
  providedIn: 'root'
})
export class ProductsStore extends ComponentStore<ProductsState>{
  public readonly newArrivalsData$: Observable<Category[]> = this.select(state => state.newArrivals.data);
  public readonly newArrivalsError$: Observable<unknown> = this.select(state => state.newArrivals.error);
  public readonly newArrivalsLoading$: Observable<boolean> = this.select(state => state.newArrivals.loading);

  public readonly product$: Observable<Product> = this.select(state => state.product.data);
  public readonly productError$: Observable<unknown> = this.select(state => state.product.error);
  public readonly productLoading$: Observable<boolean> = this.select(state => state.product.loading);

  public readonly relatedProducts$: Observable<Product[]> = this.select(state => state.relatedProducts.data);
  public readonly relatedProductsError$: Observable<unknown> = this.select(state => state.relatedProducts.error);
  public readonly relatedProductsLoading$: Observable<boolean> = this.select(state => state.relatedProducts.loading);

  public readonly loadNewArrivals = this.effect((body$: Observable<void>) => {
    return body$.pipe(
      tap(() => this.setNewArrivalsLoadingReducer(true)),
      switchMap(() => this.productsService.getNewArrivals().pipe(
        tapResponse(
          (response) => {
            this.setNewArrivalsSuccessReducer(response);
          },
          (error) => {
            this.setNewArrivalsFailureReducer(error);
          }
        )
      ))
    )
  });
  public readonly loadProduct = this.effect((body$: Observable<number>) => {
    return body$.pipe(
      tap(() => this.setProductLoadingReducer(true)),
      switchMap((id) => this.productsService.getProductById(id).pipe(
        tapResponse(
          (response) => {
            this.setProductSuccessReducer(response)
          },
          (error) => {
            this.setProductFailureReducer(error);
          }
        )
      ))
    )
  });
  public readonly loadRelatedProducts = this.effect((body$: Observable<number>) => {
    return body$.pipe(
      tap(() => this.setRelatedProductsLoadingReducer(true)),
      switchMap((id) => this.productsService.getRelatedProducts(id).pipe(
        tapResponse(
          (response) => {
            this.setRelatedProductsSuccessReducer(response)
          },
          (error) => {
            this.setRelatedProductsFailureReducer(error);
          }
        )
      ))
    )
  });

  private setNewArrivalsSuccessReducer = this.updater((state, payload: Category[]) => ({
    ...state,
    newArrivals: {
      ...state.newArrivals,
      error: null,
      loading: false,
      data: [...payload]
    }
  }));
  private setNewArrivalsFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    newArrivals: {
      ...state.newArrivals,
      error,
      loading: false,
    }
  }));
  private setNewArrivalsLoadingReducer = this.updater((state, payload: boolean) => ({
    ...state,
    newArrivals: {
      ...state.newArrivals,
      loading: payload
    }
  }));

  private setProductSuccessReducer = this.updater((state, payload: Product) => ({
    ...state,
    product: {
      data: payload,
      loading: false,
      error: null,
    }
  }));
  private setProductFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    product: {
      data: null,
      loading: false,
      error,
    }
  }));
  private setProductLoadingReducer = this.updater((state, payload: boolean) => ({
    ...state,
    product: {
      ...state.product,
      loading: payload
    }
  }));

  private setRelatedProductsSuccessReducer = this.updater((state, payload: Product[]) => ({
    ...state,
    relatedProducts: {
      data: payload,
      loading: false,
      error: null,
    }
  }));
  private setRelatedProductsFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    relatedProducts: {
      data: [],
      loading: false,
      error,
    }
  }));
  private setRelatedProductsLoadingReducer = this.updater((state, payload: boolean) => ({
    ...state,
    relatedProducts: {
      ...state.relatedProducts,
      loading: payload
    }
  }));

  constructor(
    private productsService: ProductsService
  ) {
    super(initialState);
  }
}
