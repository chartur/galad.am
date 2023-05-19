import { ProductAssetType } from "@interfaces/product-asset-type";

export interface ProductAsset {
  id: number;
  link: string;
  type: ProductAssetType;
  is_main: boolean;
  created_at: string;
  updated_at: string;
}
