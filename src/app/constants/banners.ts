import { Banner } from "@interfaces/banner";
import { BannerTextPosition } from "@enums/banner-text-position";

export const banners: Banner[] = [
  {
    imageUrl: "/assets/images/placeholders/banners/1.jpg",
    subtitle: "Shukra Yogam & Silver Power Silver Saving Schemes.",
    title: "Diamonds Jewelry Collections",
    buttonText: "Shop Now",
    buttonUrl: "/shop",
    textPosition: BannerTextPosition.right
  },
  {
    imageUrl: "/assets/images/placeholders/banners/2.jpg",
    subtitle: "Shukra Yogam & Silver Power Silver Saving Schemes.",
    title: "Diamonds Jewelry Collections",
    buttonText: "Shop Now",
    buttonUrl: "/shop",
    textPosition: BannerTextPosition.left
  }
];
