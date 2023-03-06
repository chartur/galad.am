import { ProductPlaceholder } from "@interfaces/product-placeholder";
import { Category } from "@enums/category";

export const productPlaceholders: ProductPlaceholder[] = [
  {
    id: 1,
    imageUrl: "/assets/images/placeholders/products/2.jpg",
    name: "Diamond Band Ring",
    price: "80.0",
    hasSale: false,
    types: ["Necklaces", "Chatelaine"],
    category: Category.Bracelets,
    availability: 10,
  },
  {
    id: 2,
    imageUrl: "/assets/images/placeholders/products/7.jpg",
    name: "Diamond Band Ring",
    price: "80.0",
    hasSale: false,
    types: ["Necklaces", "Chatelaine"],
    category: Category.Necklaces,
    availability: 10,
  },
  {
    id: 3,
    imageUrl: "/assets/images/placeholders/products/13.jpg",
    name: "Diamond Band Ring",
    price: "80.0",
    hasSale: false,
    types: ["Necklaces", "Chatelaine"],
    category: Category.Necklaces,
    availability: 10,
  },
  {
    id: 4,
    imageUrl: "/assets/images/placeholders/products/15.jpg",
    name: "Diamond Band Ring",
    price: "80.0",
    hasSale: true,
    newPrice: "72.0",
    types: ["Necklaces", "Chatelaine"],
    category: Category.Necklaces,
    availability: 10,
  }
]
