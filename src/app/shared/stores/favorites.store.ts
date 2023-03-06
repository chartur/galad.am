import { Injectable } from '@angular/core';
import {ComponentStore} from "@ngrx/component-store";
import {catchError, EMPTY, map, Observable, switchMap, take} from "rxjs";
import {ToastrService} from "ngx-toastr";

interface FavoritesStoreState {
  count: number;
  favorites: Set<number>,
}

const initialState: FavoritesStoreState = {
  count: 0,
  favorites: new Set()
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesStore extends ComponentStore<FavoritesStoreState>{

  public readonly count$: Observable<number> = this.select((state) => state.count)
  public readonly favorites$: Observable<Set<number>> = this.select((state) => state.favorites)

  public readonly delete = this.updater((state, id: number) => {
    state.favorites.delete(id);
    return {
      ...state,
      count: state.favorites.size,
      favorites: new Set(state.favorites)
    }
  })

  public readonly add = this.updater((state, id: number) => {
    state.favorites.add(id);
    return {
      ...state,
      count: state.favorites.size,
      favorites: new Set(state.favorites)
    }
  })

  public readonly toggleFavorite = this.effect((productId$: Observable<number>) => {
    return productId$.pipe(
      switchMap((id) => this.favorites$.pipe(
        take(1),
        map((favorites) => favorites.has(id) ? this.delete(id) : this.add(id))
      ))
    )
  })

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
  })

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
  })

  constructor(
    private toastr: ToastrService
  ) {
    super(initialState);
  }
}
