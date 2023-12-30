export interface Filter {
  category: Set<number>,
  tags: Set<number>,
  minPrice: number,
  maxPrice: number
  q?: string
}
