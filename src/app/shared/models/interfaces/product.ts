import { Category } from "@interfaces/category";
import { ProductAsset } from "@interfaces/product-asset";
import { ProductStatus } from "@interfaces/product-status";

export interface Product {
  id: number;
  category: Category;
  assets: ProductAsset[];
  am_name: string;
  en_name: string;
  ru_name: string;
  am_description: string;
  en_description: string;
  ru_description: string;
  price: number;
  new_price: number;
  status: ProductStatus;
  available_count: number;
  created_at: Date;
  updated_at: Date;
}
