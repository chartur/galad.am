export interface Filter {
  category: Set<number>,
  tags: Set<number>,
  minPrice: number,
  maxPrice: number
  sale: boolean,
  q?: string
}
