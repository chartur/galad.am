import { ProductAssetType } from "@interfaces/product-asset-type";

export interface ProductAsset {
  id: number;
  link: string;
  type: ProductAssetType;
  created_at: string;
  updated_at: string;
}
