import {AfterViewInit, Component, Inject, OnInit, Renderer2} from '@angular/core';
import {SideBarProvider} from "./shared/providers/side-bar.provider";
import {filter, Observable, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {appVersion} from "@constants/app-version";
import { Capacitor } from '@capacitor/core';
import {SplashScreen} from "@capacitor/splash-screen";
import { ScreenOrientation } from '@capacitor/screen-orientation';
import {DOCUMENT} from "@angular/common";
import {SeoPages} from "@enums/seo-pages";
import {SeoHelper} from "./shared/helpers/seo.helper";
import {publicPath} from "@environment/environment";
import {SeoStore} from "@stores/seo.store";
import {TelegramService} from "@services/telegram.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public visibility$: Observable<boolean> = this.sideBarProvider.visibility$;

  constructor(
    private sideBarProvider: SideBarProvider,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT)
    private document: Document,
    private seoStore: SeoStore,
    private seoHelper: SeoHelper,
    private telegramService: TelegramService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(appVersion);
    this.watchSeoData();
    this.watchSideBarVisibilityState();
    if (Capacitor.getPlatform() !== 'web') {
      await ScreenOrientation.lock({ orientation: 'natural' });
      this.showSplashScreen();
    }
  }

  ngAfterViewInit() {
    this.telegramService.init();
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
      showDuration: 4000,
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
