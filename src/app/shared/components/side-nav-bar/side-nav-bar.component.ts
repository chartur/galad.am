import { Component } from '@angular/core';
import { SideBarProvider } from "../../providers/side-bar.provider";
import { Observable } from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {
  public visibility$: Observable<boolean> = this.sideBarProvider.visibility$

  constructor(
    private sideBarProvider: SideBarProvider,
    public translateService: TranslateService
  ) {}

  public closeSideBar(): void {
    this.sideBarProvider.hide()
  }
}
