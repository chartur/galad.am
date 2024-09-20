import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { defaultLanguage } from "../../constants/languages";
import { TranslateService } from "@ngx-translate/core";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LanguageGuard  {

  constructor(
    private router: Router,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.translateService.langs.some(lang => lang === route.params["language"])) {
      const url = [...route.url];
      url[0] = new UrlSegment(defaultLanguage, {});
      this.router.navigate(url, {
        queryParams: route.queryParams
      });

      this.translateService.use(defaultLanguage).subscribe();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem("lang", defaultLanguage);
      }
      return false;
    }

    this.translateService.use(route.params["language"]).subscribe();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("lang", route.params["language"]);
    }
    return true;
  }

}
