import { BannerTextPosition } from "../enums/banner-text-position";

export interface Banner {
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  textPosition: BannerTextPosition
}
