import {SeoPages} from "@enums/seo-pages";

export interface SeoData {
  page: SeoPages | null;
  am_description: string;
  ru_description: string;
  en_description: string;
  am_title: string;
  ru_title: string;
  en_title: string;
  am_keywords: string;
  ru_keywords: string;
  en_keywords: string;
  image: string;
}
