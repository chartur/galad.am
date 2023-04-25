import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsStore } from "@stores/products.store";
import { Observable } from "rxjs";
import { Product } from "@interfaces/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public readonly product$: Observable<Product> = this.productsStore.product$;

  constructor(
    private productsStore: ProductsStore
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
