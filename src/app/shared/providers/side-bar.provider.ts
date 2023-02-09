import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";

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

  constructor() {
    super(initialState);
  }
}
