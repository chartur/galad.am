import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {SideBarProvider} from "./shared/providers/side-bar.provider";
import {filter, Observable, switchMap, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {appVersion} from "@constants/app-version";
import {SplashScreen} from "@capacitor/splash-screen";
import {DOCUMENT} from "@angular/common";
import {SeoPages} from "@enums/seo-pages";
import {SeoHelper} from "./shared/helpers/seo.helper";
import {publicPath} from "@environment/environment";
import {SeoStore} from "@stores/seo.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public visibility$: Observable<boolean> = this.sideBarProvider.visibility$;

  constructor(
    private sideBarProvider: SideBarProvider,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT)
    private document: Document,
    private seoStore: SeoStore,
    private seoHelper: SeoHelper
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(appVersion);
    this.watchSeoData();
    this.watchSideBarVisibilityState();
    this.showSplashScreen();
  }

  public hideSideBar(): void {
    this.sideBarProvider.hide();
  }

  private watchSideBarVisibilityState(): void {
    this.visibility$.subscribe(state => {
      if(state) {
        this.renderer.addClass(this.document.body, 'modal-open');
      } else {
        this.renderer.removeClass(this.document.body, 'modal-open');
      }
    })
  }

  private async showSplashScreen(): Promise<void> {
    await SplashScreen.show({
      showDuration: 3000,
      autoHide: true,
    });
  }

  private watchSeoData(): void {
    this.seoStore.loaded$
      .pipe(
        filter(state => !!state),
        switchMap(() => this.seoStore.data$)
      )
      .subscribe((seoDataMap) => {
        const homePageDetails = seoDataMap.home;
        this.seoHelper.setFavicon(
          publicPath(homePageDetails.image)
        )
      });
    this.seoStore.loadPageSeo(SeoPages.HomePage);
  }
}
