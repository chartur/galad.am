import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SpecialSection } from "@interfaces/special-section";
import { endpoints } from "@environment/environment";

@Injectable({
  providedIn: 'root'
})
export class SpecialSectionsService {

  constructor(
    private httpClient: HttpClient
  ) {}

  public loadSections(): Observable<SpecialSection[]> {
    return this.httpClient.get<SpecialSection[]>(endpoints.specialSections.getAll);
  }
}
