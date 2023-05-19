import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FavoritesStore} from "@stores/favorites.store";
import {Product} from "@interfaces/product";
import {ProductAsset} from "@interfaces/product-asset";
import {ProductAssetType} from "@interfaces/product-asset-type";

@Component({
  selector: 'app-vertical-product-item',
  templateUrl: './vertical-product-item.component.html',
  styleUrls: ['./vertical-product-item.component.scss']
})
export class VerticalProductItemComponent implements OnInit, OnDestroy {
  @Input() public product: Product;
  public isFavorite: boolean = false;
  public isInCat: boolean = false;

  public subscription: Subscription = new Subscription();

  public get mainPhoto(): ProductAsset {
    return this.product.assets.find((asset) => asset.type === ProductAssetType.Photo && asset.is_main)
  }

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
