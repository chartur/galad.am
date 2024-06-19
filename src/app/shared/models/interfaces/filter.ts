import {Gender} from "@enums/gender";

export interface Filter {
  category: Set<number>,
  tags: Set<number>,
  gender: Set<Gender>,
  minPrice: number,
  maxPrice: number
  sale: boolean,
  q?: string,
}
