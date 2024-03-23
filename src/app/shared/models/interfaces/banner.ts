import { BannerTextPosition } from "@enums/banner-text-position";
import {LinkOpenHandler} from "@enums/link-open-handler";

export interface Banner {
  id: number;
  am_title: string;
  en_title: string;
  ru_title: string;
  am_description: string;
  en_description: string;
  ru_description: string;
  am_button_text: string;
  en_button_text: string;
  ru_button_text: string;
  link: string;
  button_link: string;
  url_open_handle: LinkOpenHandler;
  is_active: boolean;
  text_position: BannerTextPosition;
  created_at: string;
  updated_at: string;
}
