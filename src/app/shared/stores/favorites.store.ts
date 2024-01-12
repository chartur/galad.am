import {Inject, inject, Injectable} from '@angular/core';
import {ComponentStore, OnStoreInit, tapResponse} from "@ngrx/component-store";
import {catchError, EMPTY, filter, map, Observable, switchMap, take, takeUntil, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "@services/local-storage.service";
import {localStorageFactory} from "@factories/local-storage.factory";
import {LOCAL_STORAGE_TOKEN} from "../injection-tokens/local-storage.token";
import {Product} from "@interfaces/product";
import {FavoritesService} from "@services/favorites.service";

interface FavoritesStoreState {
  count: number;
  favorites: Set<number>,
  products: Product[],
  loading: boolean,
  error: unknown,
}

const initialState: FavoritesStoreState = {
  count: 0,
  favorites: new Set(),
  products: [],
  loading: false,
  error: null
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesStore extends ComponentStore<FavoritesStoreState> implements OnStoreInit {
  public readonly count$: Observable<number> = this.select((state) => state.count);
  public readonly favorites$: Observable<Set<number>> = this.select((state) => state.favorites);
  public readonly favoriteProducts$: Observable<Product[]> = this.select((state) => state.products);
  public readonly loading$: Observable<boolean> = this.select((state) => state.loading);

  public setFavoriteProductsSuccess = this.updater((state, payload: Product[]) => ({
    ...state,
    products: payload,
    loading: false,
    error: null
  }));
  public setFavoriteProductsFailure = this.updater((state, error: unknown) => ({
    ...state,
    error,
    products: [],
    loading: false,
  }));
  public setLoadingState = this.updater((state, payload: boolean) => ({
    ...state,
    loading: payload
  }));

  public readonly delete = this.updater((state, id: number) => {
    state.favorites.delete(id);
    return {
      ...state,
      count: state.favorites.size,
      favorites: new Set(state.favorites)
    }
  });

  public readonly add = this.updater((state, id: number) => {
    state.favorites.add(id);
    return {
      ...state,
      count: state.favorites.size,
      favorites: new Set(state.favorites)
    }
  });

  public readonly toggleFavorite = this.effect((productId$: Observable<number>) => {
    return productId$.pipe(
      switchMap((id) => this.favorites$.pipe(
        take(1),
        map((favorites) => favorites.has(id) ? this.delete(id) : this.add(id))
      ))
    )
  });

  public readonly deleteProduct = this.effect((productId$: Observable<number>) => {
    return productId$.pipe(
      map((id) => {
        this.delete(id);
        this.toastr.success("Product successfully deleted from favorites list!")
      }),
      catchError((err) => {
        this.toastr.error("Something was wrong");
        return EMPTY
      })
    )
  });

  public readonly addProduct = this.effect((productId$: Observable<number>) => {
    return productId$.pipe(
      map((id) => {
        this.add(id);
        this.toastr.success("Product successfully added from favorites list!")
      }),
      catchError((err) => {
        this.toastr.error("Something was wrong");
        return EMPTY
      })
    )
  });

  public readonly loadProducts = this.effect((body$: Observable<void>) => {
    return body$.pipe(
      tap(() => {
        this.setLoadingState(true)
      }),
      switchMap(() => this.favorites$.pipe(
        take(1)
      )),
      switchMap((ids) => this.favoritesService.getFavoriteProducts([...ids])),
      tapResponse(
        (response) => {
          console.log(response);
          this.setFavoriteProductsSuccess(response);
        },
        (error) => {
          this.setFavoriteProductsFailure(error);
        }
      )
    )
  })

  constructor(
    private toastr: ToastrService,
    private favoritesService: FavoritesService,
    private localStorageService: LocalStorageService
  ) {
    super(initialState);
  }

  ngrxOnStoreInit(): void {
    const favorites = this.localStorageService.get<number[]>('favorites') || [];
    this.setState({
      ...initialState,
      count: favorites.length,
      favorites: new Set(favorites)
    });
    this.state$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((state) => {
      this.localStorageService.set('favorites', [...state.favorites])
    });
  }
}
