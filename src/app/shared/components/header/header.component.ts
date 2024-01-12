import { Component } from '@angular/core';
import { SideBarProvider } from "../../providers/side-bar.provider";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public translateService: TranslateService,
    private sideBarProvider: SideBarProvider
  ) {
  }
  public openSideBar(event: Event): void {
    event.stopPropagation();
    this.sideBarProvider.show();
  }
}
