import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "@interfaces/tag";
import {endpoints} from "@environment/environment";
import {TableResponsePayload} from "@dto/response/table-response-payload";
import {TableRequestPayload} from "@dto/request/table-request-payload";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getTags(body: TableRequestPayload): Observable<TableResponsePayload<Tag>> {
    return this.httpClient.get<TableResponsePayload<Tag>>(endpoints.tags.loadAll, {
      params: new HttpParams({ fromObject: { ...body } })
    })
  }
}
