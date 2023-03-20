import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { endpoints } from "@environment/environment";
import { Category } from "@interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getNewArrivals(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(endpoints.products.newArrivals)
  }
}
