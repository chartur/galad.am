import {PromoType} from "@enums/promo-type";
import {PromoUsageType} from "@enums/promo-usage-type";

export interface Promo {
  id: number;
  code: string;
  type: PromoType;
  value: number;
  usageType: PromoUsageType;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  expired_at?: Date;
  minOrderPrice?: number;
}
