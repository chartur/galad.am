import { BannerTextPosition } from "@enums/banner-text-position";

export interface Banner {
  id: number;
  am_title: string;
  en_title: string;
  ru_title: string;
  am_description: string;
  en_description: string;
  ru_description: string;
  link: string;
  is_active: boolean;
  text_position: BannerTextPosition;
  created_at: string;
  updated_at: string;
}
