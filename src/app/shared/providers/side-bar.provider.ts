import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import {filter, Observable, switchMap, take} from "rxjs";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

interface SideBarProviderState {
  visible: boolean
}

const initialState: SideBarProviderState = {
  visible: false
}

@Injectable({
  providedIn: "root"
})
export class SideBarProvider extends ComponentStore<SideBarProviderState>{
  public readonly visibility$: Observable<boolean> = this.select((state) => state.visible);
  public readonly hide = this.updater((state) => ({...state, visible: false}))
  public readonly show = this.updater((state) => ({...state, visible: true}))

  constructor(
    private router: Router
  ) {
    super(initialState);
    router.events.pipe(
      filter(event => event instanceof NavigationStart),
      switchMap(() => this.visibility$.pipe(
        take(1),
        filter(state => !!state),
      ))
    ).subscribe(() => {
      this.hide();
    })
  }
}
