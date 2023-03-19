import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { endpoints } from "@environment/environment";
import { CategoryWithProductCount } from "@interfaces/category-with-product-count";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public loadCategories(): Observable<CategoryWithProductCount[]> {
    return this.httpClient.get<CategoryWithProductCount[]>(
      endpoints.categories.loadAll
    )
  }
}
