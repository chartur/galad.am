import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsStore } from "@stores/products.store";
import {filter, Observable, Subscription} from "rxjs";
import { Product } from "@interfaces/product";
import { ActivatedRoute, Router } from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {ClassTranslator} from "../../shared/utils/class-translator";
import {TranslateService} from "@ngx-translate/core";
import {SeoHelper} from "../../shared/helpers/seo.helper";
import {publicPath} from "@environment/environment";
import {FavoritesStore} from "@stores/favorites.store";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public readonly product$: Observable<Product> = this.productsStore.product$;
  public readonly relatedProducts$: Observable<Product[]> = this.productsStore.relatedProducts$;
  public readonly relatedProductsLoading$: Observable<boolean> = this.productsStore.relatedProductsLoading$;
  public readonly loading$: Observable<boolean> = this.productsStore.productLoading$;
  public includedInFavoriteList: boolean = false;
  public productId: number;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private productsStore: ProductsStore,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private router: Router,
    private meta: Meta,
    private title: Title,
    private seoHelper: SeoHelper,
    private favoritesStore: FavoritesStore
  ) {}

  ngOnInit() {
    this.listenProductData();
    this.route.params.subscribe((params) => {
      const { id } = params;
      if (!id) {
        this.router.navigate(['/'])
        return;
      }
      this.productId = Number(id);

      this.subscriptions.add(
        this.favoritesStore.favorites$.subscribe(productIds => {
          this.includedInFavoriteList = productIds.has(this.productId);
        })
      );
      this.productsStore.loadProduct(this.productId);
      this.productsStore.loadRelatedProducts(this.productId);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public toggleFavoriteState(): void {
    this.favoritesStore.toggleFavorite(this.productId);
  }

  private listenProductData(): void {
    this.subscriptions.add(
      this.product$
        .pipe(
          filter(product => !!product)
        )
        .subscribe((product) => {
          const productClassTranslator = new ClassTranslator(
            product,
            this.translateService
          ).init();
          const tagsClassTranslator = product.tags.map(tag => new ClassTranslator(
            tag,
            this.translateService
          ).init());

          this.seoHelper
            .setTitle(productClassTranslator.name)
            .setDescription(productClassTranslator.description)
            .setImage(
              publicPath(product.assets.find(asset => asset.is_main).link)
            )
            .setUrl()
            .setKeywords(
              tagsClassTranslator.map(tag => tag.name).join(',')
            );
        })
    );
  }
}
