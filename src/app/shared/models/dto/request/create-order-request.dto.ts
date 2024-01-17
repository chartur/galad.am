export interface CreateOrderRequestDto {
  products: CreateOrderProductItem[],
  info: CreateOrderContactInfo,
  promo?: string;
}

export interface CreateOrderProductItem {
  quantity: number;
  productId: number;
}

export interface CreateOrderContactInfo {
  email: string;
  phone: string
}
