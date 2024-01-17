import {Product} from "@interfaces/product";

export interface CartProduct {
  count: number,
  availableCount: number,
  product: Product,
}
