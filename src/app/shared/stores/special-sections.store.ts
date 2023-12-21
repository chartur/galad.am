import { Injectable } from '@angular/core';
import { SpecialSection } from "@interfaces/special-section";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap, tap } from "rxjs";
import { SpecialSectionsService } from "@services/special-sections.service";

export interface SpecialSectionsState {
  sections: SpecialSection[],
  loading: boolean,
  error: unknown,
  loaded: boolean,
}

const initialState: SpecialSectionsState = {
  sections: [],
  loading: false,
  error: null,
  loaded: false,
}

@Injectable({
  providedIn: 'root'
})
export class SpecialSectionsStore extends ComponentStore<SpecialSectionsState>{
  public readonly sections$: Observable<SpecialSection[]> = this.select(state => state.sections);
  public readonly loading$: Observable<boolean> = this.select(state => state.loading);
  public readonly error$: Observable<unknown> = this.select(state => state.error);
  public readonly loaded$: Observable<boolean> = this.select(state => state.loaded);

  public loadCategories = this.effect((body$: Observable<void>) => {
    return body$.pipe(
      tap(() => this.setLoadingStateReducer(true)),
      switchMap(() => this.specialSectionsService.loadSections().pipe(
        tapResponse(
          (response) => {
            this.loadSectionsSuccessReducer(response)
          },
          (error) => {
            this.loadSectionsFailureReducer(error)
          }
        )
      ))
    )
  })

  private loadSectionsSuccessReducer = this.updater((state, payload: SpecialSection[]) => ({
    ...state,
    sections: [...payload],
    loading: false,
    loaded: true,
    error: null
  }))
  private loadSectionsFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    error,
    loaded: false,
    loading: false,
  }))
  private setLoadingStateReducer = this.updater((state, payload: boolean) => ({
    ...state,
    loading: payload,
  }))
  private setErrorReducer = this.updater((state, error: unknown) => ({
    ...state,
    loading: false,
    error
  }))

  constructor(
    private specialSectionsService: SpecialSectionsService,

  ) {
    super(initialState);
  }
}
