import { Product } from "@interfaces/product";
import { CategoryStatus } from "@interfaces/category-status";

export interface Category {
  id: number;
  products?: Product[];
  am_name: string;
  en_name: string;
  ru_name: string;
  status: CategoryStatus;
  link?: string;
  created_at: string;
  updated_at: string;
}
