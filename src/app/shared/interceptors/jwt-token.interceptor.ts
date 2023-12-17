import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable, of, switchMap, take } from 'rxjs';
import { LocalStorageService } from "@services/local-storage.service";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return of(
      this.localStorageService.get<String>("auth.token")
    ).pipe(
      switchMap((token) => {
        if (!token) {
          return next.handle(request);
        }

        const authReq = request.clone({
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        });

        return next.handle(authReq);
      })
    )
  }
}
