import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SeoData} from "@interfaces/seo-data";
import {endpoints} from "@environment/environment";
import {SeoPages} from "@enums/seo-pages";

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPage(page: SeoPages): Observable<SeoData> {
    return this.httpClient.get<SeoData>(endpoints.seo.getPage.replace(":page", page))
  }
}
