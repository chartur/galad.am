import {Product} from "@interfaces/product";

export interface OrderProduct {
  id: number;
  product: Partial<Product>;
  quantity: number;
  price: number;
  totalPrice: number;
  created_at: string;
  updated_at: string;
}
