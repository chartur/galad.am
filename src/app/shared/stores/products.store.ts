import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import {ProductPlaceholder} from "@interfaces/product-placeholder";
import {productPlaceholders} from "../../constants/product-placeholders";
import { Category } from "@interfaces/category";
import { Observable, switchMap, tap } from "rxjs";
import { ProductsService } from "@services/products.service";
import * as http from "http";

interface ProductsState {
  products: ProductPlaceholder[],
  newArrivals: {
    data: Category[],
    error: unknown,
    loading: boolean
  },
}

const initialState: ProductsState = {
  products: productPlaceholders,
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

  public loadNewArrivals = this.effect((body$: Observable<void>) => {
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
  })

  private setNewArrivalsSuccessReducer = this.updater((state, payload: Category[]) => ({
    ...state,
    newArrivals: {
      ...state.newArrivals,
      error: null,
      loading: false,
      data: [...payload]
    }
  }))
  private setNewArrivalsFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    newArrivals: {
      ...state.newArrivals,
      error,
      loading: false,
    }
  }))
  private setNewArrivalsLoadingReducer = this.updater((state, payload: boolean) => ({
    ...state,
    newArrivals: {
      ...state.newArrivals,
      loading: payload
    }
  }))

  constructor(
    private productsService: ProductsService
  ) {
    super(initialState);
  }
}
