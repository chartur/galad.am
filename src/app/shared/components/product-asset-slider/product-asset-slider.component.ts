import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import {ProductAsset} from "@interfaces/product-asset";
import {ProductAssetType} from "@interfaces/product-asset-type";

@Component({
  selector: 'app-product-asset-slider',
  templateUrl: './product-asset-slider.component.html',
  styleUrls: ['./product-asset-slider.component.scss'],
})
export class ProductAssetSliderComponent implements AfterViewInit {
  @ViewChild('slider', { static: true }) slider: ElementRef<HTMLDivElement>;
  @Input('assets') set assets(data: ProductAsset[]) {
    this.assetList = data;
    this.selectedAsset = this.assetList.find(asset => asset.is_main);
  }
  public selectedAsset: ProductAsset;
  public assetList: ProductAsset[];
  public assetsType = ProductAssetType;
  public showScrollArrows: boolean;
  private _assetElementSize = 150;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showScrollArrows = this.slider.nativeElement.scrollWidth > this.slider.nativeElement.clientWidth;
    })
  }

  public scrollToRight(): void {
    this.slider.nativeElement.scrollBy({
      left: this._assetElementSize,
      behavior: 'smooth'
    });
  }

  public scrollToLeft(): void {
    console.log(this.slider.nativeElement.scrollLeft - this._assetElementSize);
    this.slider.nativeElement.scrollBy({
      left: this._assetElementSize * -1,
      behavior: 'smooth'
    });
  }

  public selectAsset(asset: ProductAsset, fromList: boolean): void {
    if (!fromList) {
      return;
    }
    this.selectedAsset = asset;
  }
}
