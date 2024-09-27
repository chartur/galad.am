import {Injectable} from '@angular/core';
import {Product} from "@interfaces/product";
import {CartProduct} from "@interfaces/cart-product";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {
  catchError,
  concatMap,
  EMPTY,
  map,
  Observable,
  of,
  skip,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError
} from "rxjs";
import {LocalStorageService} from "@services/local-storage.service";
import {CartProductBasket} from "@interfaces/cart-product-basket";
import {CreateOrderRequestDto} from "@dto/request/create-order-request.dto";
import {OrderService} from "@services/order.service";
import {ToastrService} from "ngx-toastr";
import {ProductsService} from "@services/products.service";
import {Promo} from "@interfaces/promo";
import {PromoService} from "@services/promo.service";
import {SystemMessages} from "@constants/system-messages";
import {PromoType} from "@enums/promo-type";
import {DiscountsMap} from "@interfaces/discounts-map";

interface CartState {
  totalPrice: number,
  originalPrice: number,
  promoCode?: Promo,
  products: CartProductBasket,
  deliveryFee: number,
  discounts: DiscountsMap,
  loading: boolean,
  loaded:  boolean,
  hasUnavailableProduct: boolean,
  error: unknown,
}

const initialState: CartState = {
  totalPrice: 0,
  originalPrice: 0,
  promoCode: null,
  discounts: {
    promo: 0,
    product: 0
  },
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
  public readonly discounts$: Observable<DiscountsMap> = this.select(store => store.discounts);
  public readonly promoCode$: Observable<Promo> = this.select(store => store.promoCode);
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
    const { totalProductsPrice, originalPrice, hasUnavailableProduct } = this.getCartDetails(products);
    const productsDiscount = originalPrice - totalProductsPrice;
    const totalPrice = originalPrice - productsDiscount - state.discounts.promo;

    return {
      ...state,
      products: products,
      totalPrice: totalPrice,
      originalPrice: originalPrice,
      discounts: {
        ...state.discounts,
        product: productsDiscount,
      },
      hasUnavailableProduct: hasUnavailableProduct,
      loading: false,
      error: null
    }
  });
  private readonly removeFromCartProductSuccess = this.updater((state, payload: number) => {
    const products: CartProductBasket = {
      ...state.products,
    };
    delete products[payload];
    const { totalProductsPrice, originalPrice, hasUnavailableProduct } = this.getCartDetails(products);
    const productsDiscount = originalPrice - totalProductsPrice;
    const totalPrice = originalPrice - productsDiscount - state.discounts.promo;

    return {
      ...state,
      products: products,
      totalPrice,
      originalPrice: originalPrice,
      discounts: {
        ...state.discounts,
        product: productsDiscount,
      },
      hasUnavailableProduct: hasUnavailableProduct,
      loading: false,
      error: null
    }
  });
  private readonly setCartProductsSuccess = this.updater((state, payload: CartProductBasket) => {
    const { totalProductsPrice, originalPrice, hasUnavailableProduct } = this.getCartDetails(payload);
    const productsDiscount = originalPrice - totalProductsPrice;
    const totalPrice = originalPrice - productsDiscount - state.discounts.promo;

    return {
      ...state,
      totalPrice,
      products: payload,
      originalPrice: originalPrice,
      discounts: {
        ...state.discounts,
        product: productsDiscount,
      },
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
    }, {} as CartProductBasket);

    const { totalProductsPrice, originalPrice, hasUnavailableProduct } = this.getCartDetails(cartProducts);
    const productsDiscount = originalPrice - totalProductsPrice;
    const totalPrice = originalPrice - productsDiscount - state.discounts.promo;

    return {
      ...state,
      totalPrice,
      products: cartProducts,
      originalPrice: originalPrice,
      discounts: {
        ...state.discounts,
        product: productsDiscount
      },
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
  private readonly setPromoSuccess = this.updater((state, payload: Promo) => {
    const { totalProductsPrice, originalPrice, hasUnavailableProduct } = this.getCartDetails(state.products);
    const productsDiscount = originalPrice - totalProductsPrice;

    let totalPrice = originalPrice - productsDiscount;
    let promoDiscount = state.discounts.promo;

    switch (payload.type) {
      case PromoType.FixedPrice:
        promoDiscount = payload.value;
        break;
      case PromoType.Percentage:
        const discountUnparsed = (totalPrice * payload.value) / 100;
        promoDiscount = parseFloat(discountUnparsed.toFixed(2))
        break;
    }
    totalPrice -= promoDiscount;

    return {
      ...state,
      totalPrice,
      originalPrice,
      discounts: {
        ...state.discounts,
        promo: promoDiscount
      },
      error: null,
      loading: false,
      promoCode: payload
    }
  });
  private readonly setPromoFailure = this.updater((state, error: unknown) => ({
    ...state,
    error,
    loading: false
  }));
  private removePromoSuccess = this.updater((state) => ({
    ...state,
    totalPrice: state.totalPrice + state.discounts.promo,
    discounts: {
      ...state.discounts,
      promo: 0
    },
    promoCode: null
  }));

  public addToCart = this.effect((body$: Observable<CartProduct>) => {
    return body$.pipe(
      switchMap((cartProduct) => this.promoCode$.pipe(
        take(1),
        tap({
          next: (promo) => {
            this.addCartProductsSuccess(cartProduct);
            if (promo) {
              this.setPromoSuccess(promo);
            }
          },
          error: () => {}
        })
      )),
    )
  });

  public createOrder = this.effect((body$: Observable<CreateOrderRequestDto>) => {
    return body$.pipe(
      tap(() => this.setLoadingState(true)),
      switchMap((body) => this.promoCode$.pipe(
        take(1),
        switchMap((promo) => this.orderService.createOrder({
          ...body,
          promo: promo?.code
        })),
        tap({
          next: (cartProduct) => {
            this.setCartProductsSuccess({});
            this.removePromoSuccess();
          },
          error: (e: any) => {
            this.toastr.error(e.response.message);
          }
        }),
        catchError(() => EMPTY)
      ))

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
      tap({
        next: (products) => {
          this.loadProductsSuccess(products);
        },
        error: (e: any) => {
          this.toastr.error(e.response.message);
        }
      })
    )
  });

  public removeFromCart = this.effect((body$: Observable<number>) => {
    return body$.pipe(
      switchMap((cartProduct) => this.promoCode$.pipe(
        take(1),
        tap({
          next: (promo) => {
            this.removeFromCartProductSuccess(cartProduct);
            if (promo) {
              this.setPromoSuccess(promo);
            }
          },
          error: () => {}
        })
      )),
    )
  });

  public getPromo = this.effect((body$: Observable<{ code: string, isBackground: boolean }>) => {
    return body$.pipe(
      tap(() => this.setLoadingState(true)),
      switchMap(({ code, isBackground }) => this.promoService.getOneByCode(code).pipe(
        switchMap((promo) => this.totalPrice$.pipe(take(1)).pipe(
          concatMap(totalPrice => {
            if (promo.minOrderPrice !== undefined && totalPrice < promo.minOrderPrice) {
              return throwError(() => new Error(
                SystemMessages.order.minimumPrice.replace(':price', promo.minOrderPrice.toString()))
              )
            }
            return of(promo)
          })
        )),
        tap({
          next: (promo) => {
            this.setPromoSuccess(promo);
            if (!isBackground) {
              this.toastr.success("Promo code is applied!");
            }
          },
          error: (e: any) => {
            this.setPromoFailure(e);
            if (!isBackground) {
              this.toastr.error(e.message || e.error.message);
            }
          }
        }),
        catchError(() => EMPTY),
      )),
    );
  });

  public removePromo = this.effect((body$: Observable<void>) => {
    return body$.pipe(
      tap(() => {
        this.removePromoSuccess();
      })
    )
  });

  constructor(
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private productsService: ProductsService,
    private promoService: PromoService,
    private toastr: ToastrService,
  ) {
    super(initialState)
  }

  ngrxOnStoreInit(): void {
    const cartProducts = this.localStorageService.get<CartProductBasket>('cart') || {};
    this.setCartProductsSuccess(cartProducts);
    const promo = this.localStorageService.get<string | null>('promo');
    if (promo) {
      this.getPromo({ code: promo, isBackground: true });
    }

    this.products$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((products) => {
      this.localStorageService.set('cart', products);
    })

    this.promoCode$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((promo) => {
      this.localStorageService.set('promo', promo?.code)
    })
  }

  private getCartDetails(payload: CartProductBasket) {
    return Object.values(payload).reduce((acc, cur) => {
      acc.totalProductsPrice += (cur.product.new_price || cur.product.price) * cur.count;
      acc.originalPrice += cur.product.price * cur.count;
      if (!acc.hasUnavailableProduct && cur.availableCount === 0) {
        acc.hasUnavailableProduct = true;
      }
      return acc;
    }, {
      totalProductsPrice: 0,
      originalPrice: 0,
      hasUnavailableProduct: false,
    });
  }
}
