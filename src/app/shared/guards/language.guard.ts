import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import {map, Observable, of, take} from 'rxjs';
import { selectedLanguage } from "../../constants/languages";
import { TranslateService } from "@ngx-translate/core";
import {isPlatformBrowser} from "@angular/common";
import {LocalStorageService} from "@services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LanguageGuard  {

  constructor(
    private router: Router,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID)
    private platformId: Object,
    private localStorageService: LocalStorageService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.translateService.langs.some(lang => lang === route.params["language"])) {
      const url = [...route.url];
      url[0] = new UrlSegment(selectedLanguage, {});
      this.router.navigate(url, {
        queryParams: route.queryParams
      });

      this.translateService.use(selectedLanguage)
        .pipe(
          take(1)
        ).subscribe();
      if (isPlatformBrowser(this.platformId)) {
        this.localStorageService.set("lang", selectedLanguage);
      }
      return false;
    }

    if (isPlatformBrowser(this.platformId)) {
      this.translateService.use(route.params["language"])
        .pipe(
          take(1)
        )
        .subscribe();
      this.localStorageService.set("lang", route.params["language"]);
    }
    return true;
  }

}
