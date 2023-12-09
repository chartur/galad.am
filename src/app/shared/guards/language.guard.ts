import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { defaultLanguage } from "../../constants/languages";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageGuard  {

  constructor(private router: Router, private translateService: TranslateService) {
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
      localStorage.setItem("lang", defaultLanguage);
      return false;
    }

    this.translateService.use(route.params["language"]).subscribe();
    localStorage.setItem("lang", route.params["language"]);
    return true;
  }

}
