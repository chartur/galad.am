import { Category } from "@enums/category";

export interface ProductPlaceholder {
  id: number;
  imageUrl: string;
  price: string;
  newPrice?: string
  hasSale?: boolean,
  name: string;
  types: string[],
  category: Category,
  availability: number
}
