import { Component, Input } from '@angular/core';
import { ProductPlaceholder } from "@interfaces/product-placeholder";

@Component({
  selector: 'app-vertical-product-item',
  templateUrl: './vertical-product-item.component.html',
  styleUrls: ['./vertical-product-item.component.scss']
})
export class VerticalProductItemComponent {
  @Input() public product: ProductPlaceholder;
}
