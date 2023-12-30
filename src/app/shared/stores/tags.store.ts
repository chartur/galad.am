import { Injectable } from '@angular/core';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {Tag} from "@interfaces/tag";
import {Observable, switchMap, tap} from "rxjs";
import {TagsService} from "@services/tags.service";

interface TagsState {
  tags: Tag[],
  loading: boolean,
  error: unknown,
  loaded: boolean,
}

const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null,
  loaded: false,
}

@Injectable({
  providedIn: 'root'
})
export class TagsStore extends ComponentStore<TagsState>{
  public tags$: Observable<Tag[]> = this.select(state => state.tags);
  public loading$: Observable<boolean> = this.select(state => state.loading);
  public loaded$: Observable<boolean> = this.select(state => state.loaded);

  private setLoadingReducer = this.updater((state, payload: boolean) => ({
    ...state,
    loading: payload
  }));
  private tagsSuccessReducer = this.updater((state, payload: Tag[]) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
    tags: payload
  }));
  private tagsFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  }))

  public loadTags = this.effect((body$: Observable<void>) => {
    return body$.pipe(
      tap(() => this.setLoadingReducer(true)),
      switchMap(() => this.tagsService.getTags({ limit: -1, page: 0 }).pipe(
        tapResponse(
          (response) => {
            this.tagsSuccessReducer(response.results);
          },
          (err) => {
            this.tagsFailureReducer(err);
          }
        )
      ))
    )
  })

  constructor(
    private tagsService: TagsService
  ) {
    super(initialState)
  }
}
