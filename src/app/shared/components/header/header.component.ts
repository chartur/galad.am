import { Component } from '@angular/core';
import { SideBarProvider } from "../../providers/side-bar.provider";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private sideBarProvider: SideBarProvider
  ) {
  }
  public openSideBar(event: Event): void {
    event.stopPropagation();
    this.sideBarProvider.show();
  }
}
