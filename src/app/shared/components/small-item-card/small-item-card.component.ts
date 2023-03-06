import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ProductPlaceholder} from "@interfaces/product-placeholder";

@Component({
  selector: 'app-small-item-card',
  templateUrl: './small-item-card.component.html',
  styleUrls: ['./small-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallItemCardComponent {
  @Input() product: ProductPlaceholder;
}
