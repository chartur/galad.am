import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription, switchMap, take} from "rxjs";
import {FavoritesStore} from "@stores/favorites.store";
import {Product} from "@interfaces/product";
import {ProductAsset} from "@interfaces/product-asset";
import {ProductAssetType} from "@interfaces/product-asset-type";
import {TranslateService} from "@ngx-translate/core";
import {Route, Router} from "@angular/router";
import {CartStore} from "@stores/cart.store";

@Component({
  selector: 'app-vertical-product-item',
  templateUrl: './vertical-product-item.component.html',
  styleUrls: ['./vertical-product-item.component.scss']
})
export class VerticalProductItemComponent implements OnInit, OnDestroy {
  @Input() public product: Product;
  public isFavorite: boolean = false;
  public isInCat: boolean = false;
  public unavailable: boolean;

  public subscription: Subscription = new Subscription();

  constructor(
    private favoritesStore: FavoritesStore,
    private cartStore: CartStore,
    public translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.unavailable = !this.product.available_count;
    this.subscription.add(
      this.favoritesStore.favorites$.subscribe(favorites => {
        this.isFavorite = favorites.has(this.product.id);
      })
    );
    this.subscription.add(
      this.cartStore.products$.subscribe(card => {
        this.isInCat = !!card[this.product.id];
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public toggleToCart(): void {
    if (this.isInCat) {
      this.cartStore.products$.pipe(
        take(1),
      ).subscribe(products => {
        const product = products[this.product.id];
        return this.cartStore.removeFromCart(product)
      });
      return;
    }
    this.cartStore.addToCart({
      count: 1,
      product: this.product,
      availableCount: this.product.available_count
    });
  }

  public toggleFavorite(): void {
    this.favoritesStore.toggleFavorite(this.product.id);
  }
}
