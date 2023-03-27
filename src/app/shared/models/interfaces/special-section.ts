import { SpecialSectionStatus } from "@interfaces/special-section-status";
import { Product } from "@interfaces/product";

export interface SpecialSection {
  am_title: string;
  ru_title: string,
  en_title: string,
  status: SpecialSectionStatus,
  products: Product[],
  created_at: string;
  updated_at: string;
}
