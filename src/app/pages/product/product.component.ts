import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsStore } from "@stores/products.store";
import { Observable } from "rxjs";
import { Product } from "@interfaces/product";
import { ActivatedRoute, Router } from "@angular/router";

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
  constructor(
    private productsStore: ProductsStore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { id } = params;
      if (!id) {
        this.router.navigate(['/'])
        return;
      }

      this.productsStore.loadProduct(id);
      this.productsStore.loadRelatedProducts(id);
    })

  }

  ngOnDestroy() {
  }


}
