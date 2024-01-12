import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "@interfaces/product";
import {endpoints} from "@environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public getFavoriteProducts(productIds: number[]): Observable<Product[]> {
    return this.httpClient.post<Product[]>(endpoints.products.getByIds, { products: productIds });
  }
}
