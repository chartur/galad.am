import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import { ProductPlaceholder } from "@interfaces/product-placeholder";
import {FavoritesStore} from "@sores/favorites.store";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-vertical-product-item',
  templateUrl: './vertical-product-item.component.html',
  styleUrls: ['./vertical-product-item.component.scss']
})
export class VerticalProductItemComponent implements OnInit, OnDestroy {
  @Input() public product: ProductPlaceholder;
  public isFavorite: boolean = false;
  public isInCat: boolean = false;

  public subscription: Subscription = new Subscription();

  constructor(
    private favoritesStore: FavoritesStore
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.favoritesStore.favorites$.subscribe(favorites => {
        this.isFavorite = favorites.has(this.product.id);
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public toggleFavorite(): void {
    this.favoritesStore.toggleFavorite(this.product.id);
  }
}
