import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from "rxjs";
import { ComponentStore } from "@ngrx/component-store";
import { CategoriesService } from "@services/categories.service";
import { CategoryWithProductCount } from "@interfaces/category-with-product-count";

interface CategoriesState {
  categories: CategoryWithProductCount[],
  loading: boolean,
  error: unknown,
  loaded: boolean,
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
  loaded: false,
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesStore extends ComponentStore<CategoriesState>{
  public readonly categories$: Observable<CategoryWithProductCount[]> = this.select(state => state.categories)
  public readonly categoriesLoaded$: Observable<boolean> = this.select(state => state.loaded)

  public loadCategories = this.effect((body$: Observable<void>) => {
    return body$.pipe(
      tap(() => this.setLoadingStateReducer(true)),
      switchMap(() => this.categoriesService.loadCategories().pipe(
        tap({
          next: (response) => {
            this.loadCategoriesSuccessReducer(response)
          },
          error: (error) => {
            this.loadCategoriesFailureReducer(error)
          }
        })
      ))
    )
  })

  private loadCategoriesSuccessReducer = this.updater((state, payload: CategoryWithProductCount[]) => ({
    ...state,
    categories: [...payload],
    loading: false,
    error: null,
    loaded: true,
  }))
  private loadCategoriesFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    error,
    loading: false,
    loaded: false,
  }))
  private setLoadingStateReducer = this.updater((state, payload: boolean) => ({
    ...state,
    loading: payload,
  }))
  private setErrorReducer = this.updater((state, error: unknown) => ({
    ...state,
    loading: false,
    error
  }))

  constructor(
    private categoriesService: CategoriesService,
  ) {
    super(initialState);
  }
}
