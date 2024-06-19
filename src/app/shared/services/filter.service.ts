import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "@interfaces/product";
import {HttpClient, HttpParams} from "@angular/common/http";
import {endpoints} from "@environment/environment";
import {Filter} from "@interfaces/filter";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private httpClient: HttpClient) { }

  public filter(body: Filter): Observable<Product[]> {
    return this.httpClient.post<Product[]>(endpoints.filter.index, {
      ...body,
      tags: [...body.tags],
      category: [...body.category],
      gender: [...body.gender]
    })
  }
}
