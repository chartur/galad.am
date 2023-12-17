import { Component, OnInit, Renderer2 } from '@angular/core';
import { SideBarProvider } from "./shared/providers/side-bar.provider";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { appVersion } from "@constants/app-version";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public visibility$: Observable<boolean> = this.sideBarProvider.visibility$;

  constructor(
    private sideBarProvider: SideBarProvider,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(appVersion)
    this.watchSideBarVisibilityState();
  }

  public hideSideBar(): void {
    this.sideBarProvider.hide();
  }

  private watchSideBarVisibilityState(): void {
    this.visibility$.subscribe(state => {
      if(state) {
        this.renderer.addClass(document.body, 'modal-open');
      } else {
        this.renderer.removeClass(document.body, 'modal-open');
      }
    })
  }
}
