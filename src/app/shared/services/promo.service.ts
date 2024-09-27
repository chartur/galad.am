import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Promo} from "@interfaces/promo";
import {endpoints} from "@environment/environment";

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  constructor(
    private httpClient: HttpClient
  ) {}

  public getOneByCode(code: string): Observable<Promo> {
    return this.httpClient.get<Promo>(endpoints.promo.getByCode, {
      params: {
        code
      }
    });
  }
}
