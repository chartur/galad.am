import { Banner } from "@interfaces/banner";
import { BannerTextPosition } from "@enums/banner-text-position";

export const banners: Banner[] = [
  {
    imageUrl: "http://corano.mallthemes.com/wp-content/uploads/2019/04/slideshow1-2.jpg",
    subtitle: "Shukra Yogam & Silver Power Silver Saving Schemes.",
    title: "Diamonds Jewelry Collections",
    buttonText: "Shop Now",
    buttonUrl: "/shop",
    textPosition: BannerTextPosition.right
  },
  {
    imageUrl: "http://corano.mallthemes.com/wp-content/uploads/2019/04/slideshow1-3.jpg",
    subtitle: "Shukra Yogam & Silver Power Silver Saving Schemes.",
    title: "Diamonds Jewelry Collections",
    buttonText: "Shop Now",
    buttonUrl: "/shop",
    textPosition: BannerTextPosition.left
  }
];
