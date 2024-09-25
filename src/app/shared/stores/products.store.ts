import { Injectable } from '@angular/core';
import { ComponentStore } from "@ngrx/component-store";
import { Category } from "@interfaces/category";
import { Observable, switchMap, tap } from "rxjs";
import { ProductsService } from "@services/products.service";
import { Product } from "@interfaces/product";

interface ProductsState {
  products: Product[],
  relatedProducts: {
    data: Product[],
    loading: boolean,
    error: unknown,
    loaded: boolean
  },
  product: {
    data: Product,
    loading: boolean,
    error: unknown,
    loaded: boolean
  },
  newArrivals: {
    data: Category[],
    error: unknown,
    loading: boolean,
    loaded: boolean
  },
}

const initialState: ProductsState = {
  products: [],
  relatedProducts: {
    data: [],
    loading: false,
    error: null,
    loaded: false,
  },
  product: {
    data: null,
    loading: false,
    error: null,
    loaded: false,
  },
  newArrivals: {
    data: [],
    error: null,
    loading: false,
    loaded: false,
  },
}

@Injectable({
  providedIn: 'root'
})
export class ProductsStore extends ComponentStore<ProductsState>{
  public readonly newArrivalsData$: Observable<Category[]> = this.select(state => state.newArrivals.data);
  public readonly newArrivalsError$: Observable<unknown> = this.select(state => state.newArrivals.error);
  public readonly newArrivalsLoading$: Observable<boolean> = this.select(state => state.newArrivals.loading);
  public readonly newArrivalsLoaded$: Observable<boolean> = this.select(state => state.newArrivals.loaded);

  public readonly product$: Observable<Product> = this.select(state => state.product.data);
  public readonly productError$: Observable<unknown> = this.select(state => state.product.error);
  public readonly productLoading$: Observable<boolean> = this.select(state => state.product.loading);
  public readonly productLoaded$: Observable<boolean> = this.select(state => state.product.loaded);

  public readonly relatedProducts$: Observable<Product[]> = this.select(state => state.relatedProducts.data);
  public readonly relatedProductsError$: Observable<unknown> = this.select(state => state.relatedProducts.error);
  public readonly relatedProductsLoading$: Observable<boolean> = this.select(state => state.relatedProducts.loading);
  public readonly relatedProductsLoaded$: Observable<boolean> = this.select(state => state.relatedProducts.loaded);

  public readonly loadNewArrivals = this.effect((body$: Observable<void>) => {
    return body$.pipe(
      tap(() => this.setNewArrivalsLoadingReducer(true)),
      switchMap(() => this.productsService.getNewArrivals().pipe(
        tap({
          next: (response) => {
            this.setNewArrivalsSuccessReducer(response);
          },
          error: (error) => {
            this.setNewArrivalsFailureReducer(error);
          }
        })
      ))
    )
  });
  public readonly loadProduct = this.effect((body$: Observable<number>) => {
    return body$.pipe(
      tap(() => this.setProductLoadingReducer(true)),
      switchMap((id) => this.productsService.getProductById(id).pipe(
        tap({
          next: (response) => {
            this.setProductSuccessReducer(response)
          },
          error: (error) => {
            this.setProductFailureReducer(error);
          }
        })
      ))
    )
  });
  public readonly loadRelatedProducts = this.effect((body$: Observable<number>) => {
    return body$.pipe(
      tap(() => this.setRelatedProductsLoadingReducer(true)),
      switchMap((id) => this.productsService.getRelatedProducts(id).pipe(
        tap({
          next: (response) => {
            this.setRelatedProductsSuccessReducer(response)
          },
          error: (error) => {
            this.setRelatedProductsFailureReducer(error);
          }
        })
      ))
    )
  });

  private setNewArrivalsSuccessReducer = this.updater((state, payload: Category[]) => ({
    ...state,
    newArrivals: {
      ...state.newArrivals,
      error: null,
      loading: false,
      loaded: true,
      data: [...payload]
    }
  }));
  private setNewArrivalsFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    newArrivals: {
      ...state.newArrivals,
      error,
      loaded: false,
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
      loaded: true,
      error: null,
    }
  }));
  private setProductFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    product: {
      data: null,
      loading: false,
      loaded: false,
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
      loaded: true,
      error: null,
    }
  }));
  private setRelatedProductsFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    relatedProducts: {
      data: [],
      loading: false,
      loaded: false,
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
