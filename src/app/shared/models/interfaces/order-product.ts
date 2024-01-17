import {Product} from "@interfaces/product";

export interface OrderProduct {
  id: number;
  product: Partial<Product>;
  quantity: number;
  price: string;
  totalPrice: string;
  created_at: string;
  updated_at: string;
}
