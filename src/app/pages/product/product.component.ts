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
  private subscriptions: Subscription = new Subscription();
  constructor(
    private productsStore: ProductsStore,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private router: Router,
    private meta: Meta,
    private title: Title,
    private seoHelper: SeoHelper,
  ) {}

  ngOnInit() {
    this.listenProductData();
    this.route.params.subscribe((params) => {
      const { id } = params;
      if (!id) {
        this.router.navigate(['/'])
        return;
      }

      this.productsStore.loadProduct(id);
      this.productsStore.loadRelatedProducts(id);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
