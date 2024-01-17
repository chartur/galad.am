import { Injectable } from '@angular/core';
import {Product} from "@interfaces/product";
import {CartProduct} from "@interfaces/cart-product";
import {ComponentStore, OnStoreInit, tapResponse} from "@ngrx/component-store";
import {map, Observable, switchMap, take, takeUntil, tap} from "rxjs";
import {PromoCodeDetails} from "@interfaces/promo-code-details";
import {LocalStorageService} from "@services/local-storage.service";
import {CartProductBasket} from "@interfaces/cart-product-basket";
import {CreateOrderRequestDto} from "@dto/request/create-order-request.dto";
import {OrderService} from "@services/order.service";
import {ToastrService} from "ngx-toastr";
import {ProductsService} from "@services/products.service";

interface CartState {
  totalPrice: number,
  originalPrice: number,
  promoCode: PromoCodeDetails,
  products: CartProductBasket,
  deliveryFee: number,
  discount: number,
  loading: boolean,
  loaded:  boolean,
  hasUnavailableProduct: boolean,
  error: unknown,
}

const initialState: CartState = {
  totalPrice: 0,
  originalPrice: 0,
  promoCode: {
    code: '',
    discount: 0
  },
  discount: 0,
  products: {},
  deliveryFee: 0,
  loading: false,
  loaded: false,
  hasUnavailableProduct: false,
  error: null
}

@Injectable({
  providedIn: 'root'
})
export class CartStore extends ComponentStore<CartState> implements OnStoreInit {

  public readonly products$: Observable<CartProductBasket> = this.select(store => store.products);
  public readonly productsCount$: Observable<number> = this.products$.pipe(map(products => Object.keys(products).length))
  public readonly totalPrice$: Observable<number> = this.select(store => store.totalPrice);
  public readonly originalPrice$: Observable<number> = this.select(store => store.originalPrice);
  public readonly discount$: Observable<number> = this.select(store => store.discount);
  public readonly promoCode$: Observable<PromoCodeDetails> = this.select(store => store.promoCode);
  public readonly deliveryFee$: Observable<number> = this.select(store => store.deliveryFee);
  public readonly loading$: Observable<boolean> = this.select(store => store.loading);
  public readonly loaded$: Observable<boolean> = this.select(store => store.loaded);
  public readonly hasUnavailableProduct$: Observable<boolean> = this.select(store => store.hasUnavailableProduct);

  private readonly setLoadingState = this.updater((state, payload: boolean) => ({
    ...state,
    loading: payload
  }));
  private readonly addCartProductsSuccess = this.updater((state, payload: CartProduct) => {
    const products: CartProductBasket = {
      ...state.products,
      [payload.product.id]: {...payload, availableCount: payload.product.available_count},
    }
    const { totalPrice, originalPrice, hasUnavailableProduct } = Object.values(products).reduce((acc, cur) => {
      acc.totalPrice += (cur.product.new_price || cur.product.price) * cur.count;
      acc.originalPrice += cur.product.price * cur.count;
      if (!acc.hasUnavailableProduct && cur.availableCount === 0) {
        acc.hasUnavailableProduct = true;
      }
      return acc;
    }, {
      totalPrice: 0,
      originalPrice: 0,
      hasUnavailableProduct: false,
    });
    return {
      ...state,
      products: products,
      totalPrice: totalPrice,
      originalPrice: originalPrice,
      discount: originalPrice - totalPrice,
      hasUnavailableProduct: hasUnavailableProduct,
      loading: false,
      error: null
    }
  });
  private readonly removeFromCartProductSuccess = this.updater((state, payload: CartProduct) => {
    const products: CartProductBasket = {
      ...state.products,
    };
    delete products[payload.product.id];
    const { totalPrice, originalPrice, hasUnavailableProduct } = Object.values(products).reduce((acc, cur) => {
      acc.totalPrice += (cur.product.new_price || cur.product.price) * cur.count;
      acc.originalPrice += cur.product.price * cur.count;
      if (!acc.hasUnavailableProduct && cur.availableCount === 0) {
        acc.hasUnavailableProduct = true;
      }
      return acc;
    }, {
      totalPrice: 0,
      originalPrice: 0,
      hasUnavailableProduct: false,
    });
    return {
      ...state,
      products: products,
      totalPrice: totalPrice,
      originalPrice: originalPrice,
      discount: originalPrice - totalPrice,
      hasUnavailableProduct: hasUnavailableProduct,
      loading: false,
      error: null
    }
  });
  private readonly setCartProductsSuccess = this.updater((state, payload: CartProductBasket) => {
    const { totalPrice, originalPrice, hasUnavailableProduct } = Object.values(payload).reduce((acc, cur) => {
      acc.totalPrice += (cur.product.new_price || cur.product.price) * cur.count;
      acc.originalPrice += cur.product.price * cur.count;
      if (!acc.hasUnavailableProduct && cur.availableCount === 0) {
        acc.hasUnavailableProduct = true;
      }
      return acc;
    }, {
      totalPrice: 0,
      originalPrice: 0,
      hasUnavailableProduct: false,
    });
    return {
      ...state,
      products: payload,
      totalPrice: totalPrice,
      originalPrice: originalPrice,
      discount: originalPrice - totalPrice,
      hasUnavailableProduct: hasUnavailableProduct,
      loading: false,
      error: null
    }
  });
  private loadProductsSuccess = this.updater((state, payload: Product[]) => {
    const cartProducts: CartProductBasket  = payload.reduce((accumulator, current) => {
      accumulator[current.id] = {
        count: state.products[current.id].count > current.available_count
          ? current.available_count
          : state.products[current.id].count,
        product: current,
        availableCount: current.available_count
      }
      return accumulator;
    }, {} as CartProductBasket)
    const { totalPrice, originalPrice, hasUnavailableProduct } = Object.values(cartProducts).reduce((acc, cur) => {
      acc.totalPrice += (cur.product.new_price || cur.product.price) * cur.count;
      acc.originalPrice += cur.product.price * cur.count;
      if (!acc.hasUnavailableProduct && cur.availableCount === 0) {
        acc.hasUnavailableProduct = true;
      }
      return acc;
    }, {
      totalPrice: 0,
      originalPrice: 0,
      hasUnavailableProduct: false,
    });
    return {
      ...state,
      products: cartProducts,
      totalPrice: totalPrice,
      originalPrice: originalPrice,
      discount: originalPrice - totalPrice,
      hasUnavailableProduct: hasUnavailableProduct,
      loading: false,
      error: null
    }
  })
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
  });

  public createOrder = this.effect((body$: Observable<CreateOrderRequestDto>) => {
    return body$.pipe(
      tap(() => this.setLoadingState(true)),
      switchMap((body) => this.orderService.createOrder(body)),
      tapResponse(
        (cartProduct) => {
          this.setCartProductsSuccess({});
        },
        (e: any) => {
          this.toastr.error(e.response.message);
        }
      )
    )
  });

  public loadProducts = this.effect((body$: Observable<void>) => {
    return body$.pipe(
      tap(() => this.setLoadingState(true)),
      switchMap(() => this.products$.pipe(
        take(1),
        map(products => Object.keys(products).map(Number))
      )),
      switchMap((productIds) => this.productsService.getProductsByIds(productIds)),
      tapResponse(
        (products) => {
          this.loadProductsSuccess(products);
        },
        (e: any) => {
          this.toastr.error(e.response.message);

        }
      )
    )
  });

  public removeFromCart = this.effect((body$: Observable<CartProduct>) => {
    return body$.pipe(
      tapResponse(
        (cartProduct) => {
          this.removeFromCartProductSuccess(cartProduct);
        },
        () => {}
      )
    )
  });

  constructor(
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private productsService: ProductsService
  ) {
    super(initialState)
  }

  ngrxOnStoreInit(): void {
    const cartProducts = this.localStorageService.get<CartProductBasket>('cart') || {};
    this.setCartProductsSuccess(cartProducts);
    this.state$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((state) => {
      this.localStorageService.set('cart', state.products)
    })
  }
}
