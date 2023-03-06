import { Component } from '@angular/core';
import {SpecialProductsList} from "@interfaces/special-products-list";
import {productPlaceholders} from "../../../../constants/product-placeholders";

@Component({
  selector: 'app-special-products-section',
  templateUrl: './special-products-section.component.html',
  styleUrls: ['./special-products-section.component.scss']
})
export class SpecialProductsSectionComponent {
  public productLists: SpecialProductsList[] = [
    {
      title: "On Sale Products",
      products: productPlaceholders.map((p) => ({
        ...p,
        hasSale: true,
        newPrice: (Number(p.price) - 10).toString()
      }))
    },
    {
      title: "Best Sellers",
      products: productPlaceholders.map((p) => ({
        ...p,
        hasSale: false
      }))
    },
    {
      title: "Best Sellers",
      products: productPlaceholders.map((p) => ({
        ...p,
        hasSale: false
      }))
    }
  ]
}
