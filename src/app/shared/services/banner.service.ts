import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Banner } from "@interfaces/banner";
import { endpoints } from "@environment/environment";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public loadBanners(): Observable<Banner[]> {
    return this.httpClient.get<Banner[]>(endpoints.banner.getAll)
  }
}
