import { Injectable } from '@angular/core';

interface CartState {
  totalPrice: number,
  promoCode: string,
  products: Array<{productId: number, count: number}>
  deliveryFee: number,
}

@Injectable({
  providedIn: 'root'
})
export class CartStoreService {

  constructor() { }
}
