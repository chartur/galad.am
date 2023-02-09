import { ProductPlaceholder } from "@interfaces/product-placeholder";
import { Category } from "@enums/category";

export const productPlaceholders: ProductPlaceholder[] = [
  {
    imageUrl: "http://corano.mallthemes.com/wp-content/uploads/2018/11/7.jpg",
    name: "Diamond Band Ring",
    price: "80.0",
    hasSale: false,
    types: ["Necklaces", "Chatelaine"],
    category: Category.Bracelets
  },
  {
    imageUrl: "http://corano.mallthemes.com/wp-content/uploads/2018/11/15.jpg",
    name: "Diamond Band Ring",
    price: "80.0",
    hasSale: false,
    types: ["Necklaces", "Chatelaine"],
    category: Category.Necklaces
  },
  {
    imageUrl: "http://corano.mallthemes.com/wp-content/uploads/2018/11/2.jpg",
    name: "Diamond Band Ring",
    price: "80.0",
    hasSale: false,
    types: ["Necklaces", "Chatelaine"],
    category: Category.Necklaces
  },
  {
    imageUrl: "http://corano.mallthemes.com/wp-content/uploads/2018/11/13.jpg",
    name: "Diamond Band Ring",
    price: "80.0",
    hasSale: true,
    newPrice: "72.0",
    types: ["Necklaces", "Chatelaine"],
    category: Category.Necklaces
  }
]
