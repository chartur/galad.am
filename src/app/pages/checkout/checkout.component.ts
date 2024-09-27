import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartStore} from "@stores/cart.store";
import {filter, Observable, of, Subscription, switchMap, take} from "rxjs";
import {CartProductBasket} from "@interfaces/cart-product-basket";
import {TranslateService} from "@ngx-translate/core";
import {CartProduct} from "@interfaces/cart-product";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CheckoutUserInfoComponent} from "@components/checkout-user-info/checkout-user-info.component";
import {CreateOrderRequestDto} from "@dto/request/create-order-request.dto";
import {Promo} from "@interfaces/promo";
import {PromoType} from "@enums/promo-type";
import {DiscountsMap} from "@interfaces/discounts-map";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public products$: Observable<CartProductBasket> = this.cartStore.products$;
  public discounts$: Observable<DiscountsMap> = this.cartStore.discounts$;
  public promo$: Observable<Promo> = this.cartStore.promoCode$;
  public totalPrice$: Observable<number> = this.cartStore.totalPrice$;
  public originalPrice$: Observable<number> = this.cartStore.originalPrice$;
  public loading$: Observable<boolean> = this.cartStore.loading$;
  public hasUnavailableProduct$: Observable<boolean> = this.cartStore.hasUnavailableProduct$;
  public promoTypes = PromoType;
  public promoCodeValue: string = '';
  private infoModalRef: BsModalRef;
  private subscriptions: Subscription = new Subscription();


  constructor(
    private cartStore: CartStore,
    private bsModalService: BsModalService,
    public translateService: TranslateService,
  ) {
  }

  ngOnInit() {
    this.cartStore.loadProducts();
    this.subscriptions.add(
      this.promo$
        .subscribe((promo) => {
          this.promoCodeValue = promo?.code || '';
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public openInfoModal(): void {
    this.infoModalRef = this.bsModalService.show(CheckoutUserInfoComponent);
    this.infoModalRef.content.onClose.pipe(
      filter(data => !!data),
      switchMap((data: { email: string, password: string }) => this.products$.pipe(
        take(1),
        switchMap((prodcuts) => of({
          info: data,
          products: Object.values(prodcuts).map(cart => ({
            quantity: cart.count,
            productId: cart.product.id
          }))
        }))
      ))
    ).subscribe((data: CreateOrderRequestDto) => {
      this.cartStore.createOrder(data);
    })
  }

  public removeItem(product: CartProduct): void {
    this.cartStore.removeFromCart(product.product.id);
  }
  public changeProductCount(count: number, basketProduct: CartProduct) {
    basketProduct.count = count;
    this.cartStore.addToCart(basketProduct);
  }

  public loadPromoCode() {
    if (!this.promoCodeValue) {
      return;
    }
    this.cartStore.getPromo({ code: this.promoCodeValue, isBackground: false })
  }

  public removePromo(): void {
    this.cartStore.removePromo();
  }
}
