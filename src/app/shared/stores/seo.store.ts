import { Injectable } from '@angular/core';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {SeoData} from "@interfaces/seo-data";
import {SeoService} from "@services/seo.service";
import {Observable, switchMap} from "rxjs";
import {SeoPages} from "@enums/seo-pages";

export type SeoDataMap = {
  [key in SeoPages]?: SeoData
}
interface SeoState {
  loaded: boolean,
  error: unknown,
  data: SeoDataMap
}

const initialState: SeoState = {
  loaded: false,
  error: null,
  data: {}
}

@Injectable({
  providedIn: 'root'
})
export class SeoStore extends ComponentStore<SeoState>{
  public readonly data$: Observable<SeoDataMap> = this.select(state => state.data);
  public readonly loaded$: Observable<boolean> = this.select(state => state.loaded);

  public readonly loadPageSeo = this.effect((body$: Observable<SeoPages>) => {
    return body$.pipe(
      switchMap((page) => this.seoService.getPage(page).pipe(
        tapResponse(
          (response) => this.setPageSeoSuccess(response),
          (error) => this.setPageSeoFailure(error)
        )
      ))
    )
  });

  private setPageSeoSuccess = this.updater((state: SeoState, payload: SeoData) => ({
    ...state,
    loaded: true,
    error: null,
    data: {
      ...state.data,
      [payload.page]: payload
    }
  }));
  private setPageSeoFailure = this.updater((state: SeoState, error: unknown) => ({
    ...state,
    data: {
      ...state.data,
      error,
      loaded: false,
    }
  }));

  constructor(private seoService: SeoService) {
    super(initialState);
  }
}
