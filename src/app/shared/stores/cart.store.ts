import { Injectable } from '@angular/core';
import {Product} from "@interfaces/product";
import {CartProduct} from "@interfaces/cart-product";
import {ComponentStore, OnStoreInit, tapResponse} from "@ngrx/component-store";
import {map, Observable, takeUntil} from "rxjs";
import {PromoCodeDetails} from "@interfaces/promo-code-details";
import {LocalStorageService} from "@services/local-storage.service";

interface CartState {
  totalPrice: number,
  promoCode: PromoCodeDetails,
  products: {
    [key:string]: CartProduct
  },
  deliveryFee: number,
  loading: boolean,
  error: unknown
}

const initialState: CartState = {
  totalPrice: 0,
  promoCode: {
    code: '',
    discount: 0
  },
  products: {},
  deliveryFee: 0,
  loading: false,
  error: null
}

@Injectable({
  providedIn: 'root'
})
export class CartStore extends ComponentStore<CartState> implements OnStoreInit {

  public readonly products$: Observable<{ [key:string]: CartProduct }> = this.select(store => store.products);
  public readonly productsCount$: Observable<number> = this.products$.pipe(map(products => Object.keys(products).length))
  public readonly totalPrice$: Observable<number> = this.select(store => store.totalPrice);
  public readonly promoCode$: Observable<PromoCodeDetails> = this.select(store => store.promoCode);
  public readonly deliveryFee$: Observable<number> = this.select(store => store.deliveryFee);

  private readonly setLoadingState = this.updater((state, payload: boolean) => ({
    ...state,
    loading: payload
  }));
  private readonly addCartProductsSuccess = this.updater((state, payload: CartProduct) => ({
    ...state,
    products: {
      ...state.products,
      [payload.product.id]: payload
    },
  }));
  private readonly setCartProductsSuccess = this.updater((state, payload: {[key:string]: CartProduct}) => ({
    ...state,
    products: payload,
    loading: false,
    error: null
  }));
  private readonly setCartProductsFailure = this.updater((state, error: unknown) => ({
    ...state,
    error,
    products: {},
    loading: false,
  }));

  public addToCart = this.effect((body$: Observable<CartProduct>) => {
    return body$.pipe(
      tapResponse(
        (cartProduct) => {
          this.addCartProductsSuccess(cartProduct);
        },
        () => {}
      )
    )
  })

  constructor(
    private localStorageService: LocalStorageService
  ) {
    super(initialState)
  }

  ngrxOnStoreInit(): void {
    const cartProducts = this.localStorageService.get<{ [key:string]: CartProduct }>('cart') || {};
    this.setState({
      ...initialState,
      products: cartProducts,
    });
    this.state$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((state) => {
      this.localStorageService.set('cart', state.products)
    })
  }
}
