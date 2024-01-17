import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateOrderRequestDto} from "@dto/request/create-order-request.dto";
import {Observable} from "rxjs";
import {Order} from "@interfaces/order";
import {endpoints} from "@environment/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public createOrder(body: CreateOrderRequestDto): Observable<Order> {
    return this.httpClient.post<Order>(endpoints.orders.create, body);
  }
}
