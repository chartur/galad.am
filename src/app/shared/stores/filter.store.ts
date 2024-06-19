import { Injectable } from '@angular/core';
import {Product} from "@interfaces/product";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {Observable, switchMap, tap} from "rxjs";
import {Filter} from "@interfaces/filter";
import {FilterService} from "@services/filter.service";
import {Gender} from "@enums/gender";

interface FilterState {
  filter: Filter,
  products: {
    loaded: boolean,
    data: Product[],
    isEmpty: boolean
  }
  loading: boolean,
  error: unknown
}

const initialState: FilterState = {
  filter: {
    category: new Set<number>(),
    tags: new Set<number>(),
    gender: new Set<Gender>(),
    minPrice: 0,
    maxPrice: 50000,
    sale: false,
    q: ''
  },
  loading: false,
  products: {
    loaded: false,
    data: [],
    isEmpty: true
  },
  error: null
}

@Injectable({
  providedIn: 'root'
})
export class FilterStore extends ComponentStore<FilterState> {
  public loading$: Observable<boolean> = this.select(state => state.loading);
  public filter$: Observable<Filter> = this.select(state => state.filter);
  public products$: Observable<Product[]> = this.select(state => state.products.data);
  public isEmpty$: Observable<boolean> = this.select(state => state.products.isEmpty);
  public productsLoaded$: Observable<boolean> = this.select(state => state.products.loaded);


  private setLoadingState = this.updater((state, payload: boolean) => ({
    ...state,
    loading: payload
  }));
  private setFilter = this.updater((state, payload: Filter) => ({
    ...state,
    filter: payload
  }));
  private filterSuccessReducer = this.updater((state, payload: Product[]) => ({
    ...state,
    loading: false,
    error: null,
    products: {
      loaded: true,
      data: payload,
      isEmpty: payload.length === 0
    }
  }));
  private filterFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    loading: false,
    error,
  }));

  public filter = this.effect((body$: Observable<Filter>) => {
    return body$.pipe(
      tap(() => this.setLoadingState(true)),
      tap((filter) => this.setFilter(filter)),
      switchMap((body) => this.filterService.filter(body).pipe(
        tapResponse(
          (response) => {
            this.filterSuccessReducer(response);
          },
          (err) => {
            this.filterFailureReducer(err);
          }
        )
      ))
    )
  });

  constructor(
    private filterService: FilterService,
  ) {
    super(initialState);
  }
}
