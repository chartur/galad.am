import { Injectable } from '@angular/core';
import { Banner } from "@interfaces/banner";
import { ComponentStore } from "@ngrx/component-store";
import {Observable, switchMap, tap} from "rxjs";
import { BannerService } from "@services/banner.service";
import { ToastrService } from "ngx-toastr";
import { SystemMessages } from "@constants/system-messages";

interface BannersState {
  banners: Banner[],
  loading: boolean,
  error: unknown,
  loaded: boolean,
}

const initialState: BannersState = {
  banners: [],
  error: null,
  loading: false,
  loaded: false,
}

@Injectable({
  providedIn: 'root'
})
export class BannerStore extends ComponentStore<BannersState>{

  public readonly banners$: Observable<Banner[]> = this.select(state => state.banners);
  public readonly loading$: Observable<boolean> = this.select(state => state.loading);
  public readonly error: Observable<unknown> = this.select(state => state.error);
  public readonly loaded$: Observable<boolean> = this.select(state => state.loaded);

  public readonly loadBanners = this.effect(trigger$ => {
    return trigger$.pipe(
      switchMap(() => this.bannerService.loadBanners().pipe(
        tap({
          next: (response) => {
            this.loadBannersSuccessReducer(response);
          },
          error: (error: any) => {
            this.loadBannersFailureReducer(error);
            this.toastrService.error(error?.error?.message || SystemMessages.genericErrorMessages.WRONG)
          }
        })
      ))
    )
  })

  private setLoadingStateReducer = this.updater((state, payload: boolean) => ({
    ...state,
    loading: payload
  }))
  private loadBannersSuccessReducer = this.updater((state, payload: Banner[]) => ({
    ...state,
    loading: false,
    loaded: true,
    banners: [...payload]
  }))
  private loadBannersFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  }))

  constructor(
    private bannerService: BannerService,
    private toastrService: ToastrService
  ) {
    super(initialState)
  }
}
