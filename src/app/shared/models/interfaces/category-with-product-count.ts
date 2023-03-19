import { CategoryStatus } from "@interfaces/category-status";

export interface CategoryWithProductCount {
  id: number;
  products_count: string;
  am_name: string;
  en_name: string;
  ru_name: string;
  status: CategoryStatus;
  link?: string;
  created_at: string;
  updated_at: string;
}
