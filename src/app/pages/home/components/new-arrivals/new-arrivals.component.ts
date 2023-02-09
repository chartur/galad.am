import { Component, OnInit } from '@angular/core';
import { Category } from "@enums/category";
import { ProductPlaceholder } from "@interfaces/product-placeholder";
import { productPlaceholders } from "../../../../constants/product-placeholders";
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

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
  public tabs: Category[] = [];
  public selectedTab: Category = Category.Bracelets;
  public allProducts: Record<string, ProductPlaceholder[]> = {
    [Category.Bracelets]: [...productPlaceholders, ...productPlaceholders],
    [Category.Earrings]: [...productPlaceholders],
    [Category.Necklaces]: [...productPlaceholders],
  };
  public products: ProductPlaceholder[] = [];

  public ngOnInit() {
    this.setTabs();
  }

  public selectTab(tab: Category): void {
    this.selectedTab = tab;
    const productsCount = this.products.length;
    this.products = [];
    setTimeout(() => {
      this.products = this.allProducts[tab];
    }, (productsCount * 100) + 100)
  }

  private setTabs(): void {
    this.tabs = (Object.keys(this.allProducts) as Category[]);
    this.selectTab(this.tabs[0]);
  }
}
