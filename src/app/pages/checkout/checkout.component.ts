import {Component, OnInit} from '@angular/core';
import {CartStore} from "@stores/cart.store";
import {filter, Observable, of, switchMap, take} from "rxjs";
import {CartProductBasket} from "@interfaces/cart-product-basket";
import {TranslateService} from "@ngx-translate/core";
import {CartProduct} from "@interfaces/cart-product";
import {PromoCodeDetails} from "@interfaces/promo-code-details";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CheckoutUserInfoComponent} from "@components/checkout-user-info/checkout-user-info.component";
import {CreateOrderRequestDto} from "@dto/request/create-order-request.dto";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  public products$: Observable<CartProductBasket> = this.cartStore.products$;
  public discount$: Observable<number> = this.cartStore.discount$;
  public promo$: Observable<PromoCodeDetails> = this.cartStore.promoCode$;
  public totalPrice$: Observable<number> = this.cartStore.totalPrice$;
  public originalPrice$: Observable<number> = this.cartStore.originalPrice$;
  public loading$: Observable<boolean> = this.cartStore.loading$;
  public hasUnavailableProduct$: Observable<boolean> = this.cartStore.hasUnavailableProduct$;
  private infoModalRef: BsModalRef;

  constructor(
    private cartStore: CartStore,
    private bsModalService: BsModalService,
    public translateService: TranslateService,
  ) {
  }

  ngOnInit() {
    this.cartStore.loadProducts();
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
}
