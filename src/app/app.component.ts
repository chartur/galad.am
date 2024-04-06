import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {SideBarProvider} from "./shared/providers/side-bar.provider";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {appVersion} from "@constants/app-version";
import {SplashScreen} from "@capacitor/splash-screen";
import {DOCUMENT} from "@angular/common";
import {SeoService} from "@services/seo.service";
import {SeoPages} from "@enums/seo-pages";
import {SeoData} from "@interfaces/seo-data";
import {SeoHelper} from "./shared/helpers/seo.helper";
import {publicPath} from "@environment/environment";

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
    private seoService: SeoService,
    private seoHelper: SeoHelper
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(appVersion)
    this.seoService.getPage(SeoPages.HomePage)
      .subscribe((seoData: SeoData) => {
        const { image } = seoData;
        this.seoHelper.setFavicon(
          publicPath(image)
        )
      });
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
}
