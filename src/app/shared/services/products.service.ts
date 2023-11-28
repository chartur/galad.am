import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { endpoints } from "@environment/environment";
import { Category } from "@interfaces/category";
import { Product } from "@interfaces/product";

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

  public getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(
      endpoints.products.getById.replace(":id", id.toString())
    )
  }

  public getRelatedProducts(id: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      endpoints.products.relatedProducts.replace(":id", id.toString())
    )
  }
}
