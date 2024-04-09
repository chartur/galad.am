import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import {filter, interval, Subscription} from "rxjs";
import { Banner } from "@interfaces/banner";
import { BannerTextPosition } from "@enums/banner-text-position";
import { publicPath } from "@environment/environment";
import { BannerStore } from "@stores/banner.store";
import { isPlatformBrowser } from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  public activeBannerIndex = 0;
  public banners: Banner[] = [];
  public bannerTextPosition = BannerTextPosition;
  private bannerMovementSubscription: Subscription;
  private subscriptions: Subscription = new Subscription()

  constructor(
    private bannerStore: BannerStore,
    @Inject(PLATFORM_ID) private platformId: Object,
    public translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.watchBanners()
    this.initBanner();
    this.loadBanners();
  }

  ngOnDestroy(): void {
    this.bannerMovementSubscription?.unsubscribe();
    this.subscriptions.unsubscribe()
  }

  public get bannerImagePath(): string {
    if (!this.banners.length) {
      return '';
    }
    const activeBanner = this.banners[this.activeBannerIndex];
    if (!activeBanner) {
      return '';
    }
    return publicPath(this.banners[this.activeBannerIndex].link);
  }

  public bannerToLeft(): void {
    this.bannerMovementSubscription?.unsubscribe()
    let currentIndex = this.activeBannerIndex - 1;
    if (currentIndex < 0) {
      currentIndex = this.banners.length - 1;
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

  public openBannerUrl(banner: Banner) {
    window.open(
      '/' + this.translateService.currentLang + banner.button_link,
      banner.url_open_handle
    );
  }

  private initBanner(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.bannerMovementSubscription = interval(7000)
        .subscribe(() => this.bannerToRight())
    }
  }

  private watchBanners(): void {
    this.subscriptions.add(
      this.bannerStore.banners$
        .subscribe(banners => this.banners = banners)
    )
  }

  private loadBanners() {
    this.subscriptions.add(
      this.bannerStore.loaded$.pipe(
        filter(state => !state)
      ).subscribe(() => {
        this.bannerStore.loadBanners();
      })
    );
  }
}
