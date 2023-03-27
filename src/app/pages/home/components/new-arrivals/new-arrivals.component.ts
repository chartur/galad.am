import { Component, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { ProductsStore } from "@stores/products.store";
import { Subscription } from "rxjs";
import { Category } from "@interfaces/category";
import { Product } from "@interfaces/product";

const listAnimation = trigger('listAnimation', [
  transition('* => *', [ // each time the binding value changes
    query(':leave', [
      stagger(100, [
        animate('0.3s', style({ opacity: 0 }))
      ])
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0 }),
      stagger(100, [
        animate('0.3s', style({ opacity: 1 }))
      ])
    ], { optional: true })
  ])
])

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
  animations: [listAnimation]
})
export class NewArrivalsComponent implements OnInit {
  public categories: Category[] = [];
  public selectedTab: Category;
  public products: Product[] = [];
  private subscriptions: Subscription = new Subscription()

  constructor(
    private productsStore: ProductsStore
  ) {
  }

  public ngOnInit() {
    this.subscriptions.add(
      this.productsStore.newArrivalsData$.subscribe((categories) => {
        this.categories = categories;
        if(categories.length) {
          if(!this.selectedTab) {
            const category = categories.at(0);
            this.selectedTab = category;
            this.products = category.products;
          }
        }
      })
    )
    this.productsStore.loadNewArrivals();
  }

  public selectTab(tab: Category): void {
    this.selectedTab = tab;
    const productsCount = this.products.length;
    this.products = [];
    setTimeout(() => {
      this.products = tab.products;
    }, (productsCount * 100) + 100)
  }
}
