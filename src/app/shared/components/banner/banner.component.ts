import { Component, OnDestroy, OnInit } from '@angular/core';
import { banners } from "../../../constants/banners";
import { Subscription } from "rxjs";
import { Banner } from "@interfaces/banner";
import { BannerTextPosition } from "@enums/banner-text-position";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  public activeBannerIndex = 0;
  public banners: Banner[] = banners;
  public bannerTextPosition = BannerTextPosition;
  private bannerMovementSubscription: Subscription;

  ngOnInit(): void {
    this.initBanner();
  }

  ngOnDestroy(): void {
    this.bannerMovementSubscription?.unsubscribe();
  }

  public bannerToLeft(): void {
    this.bannerMovementSubscription?.unsubscribe()
    let currentIndex = this.activeBannerIndex - 1;
    if (currentIndex < 0) {
      currentIndex = banners.length - 1;
    }

    this.activeBannerIndex = currentIndex;
    this.initBanner();
  }

  public bannerToRight(): void {
    this.bannerMovementSubscription?.unsubscribe();
    let currentIndex = this.activeBannerIndex + 1;
    if (currentIndex >= this.banners.length) {
      currentIndex = 0;
    }

    this.activeBannerIndex = currentIndex;
    this.initBanner();
  }

  private initBanner(): void {
    // this.bannerMovementSubscription = interval(5000)
    //   .subscribe(() => this.bannerToRight())
  }
}
