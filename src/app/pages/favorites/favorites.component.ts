import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, map, Observable, Subscription, zip} from "rxjs";
import {FavoritesStore} from "@stores/favorites.store";
import {Product} from "@interfaces/product";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean> = this.favoritesStore.loading$;
  public products$: Observable<Product[]> = combineLatest([
    this.favoritesStore.favoriteProducts$,
    this.favoritesStore.favorites$
  ]).pipe(
    map(
      ([products, ids]) => products.filter(product => ids.has(product.id))
    )
  );
  public isEmpty$: Observable<boolean> = this.favoritesStore.favorites$
    .pipe(
      map((ids) => !ids.size)
    )

  constructor(
    private favoritesStore: FavoritesStore
  ) {
  }

  ngOnInit() {
    this.favoritesStore.loadProducts();
  }

  ngOnDestroy() {
  }
}
