import { Injectable } from '@angular/core';
import {ComponentStore} from "@ngrx/component-store";
import {ProductPlaceholder} from "@interfaces/product-placeholder";
import {productPlaceholders} from "../../constants/product-placeholders";

interface ProductsState {
  products: ProductPlaceholder[],
}

const initialState: ProductsState = {
  products: productPlaceholders
}

@Injectable({
  providedIn: 'root'
})
export class ProductsStore extends ComponentStore<ProductsState>{

  constructor() {
    super(initialState);
  }
}
