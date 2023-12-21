import { Component } from '@angular/core';
import { FavoritesStore } from "@stores/favorites.store";
import {TranslateService} from "@ngx-translate/core";
import {AuthStore} from "@stores/auth.store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header-actions-button',
  templateUrl: './header-actions-button.component.html',
  styleUrls: ['./header-actions-button.component.scss']
})
export class HeaderActionsButtonComponent {
  public favoritesCount$ = this.favoritesStore.count$;
  public isLoggedIn$: Observable<boolean> = this.authStore.isLoggedIn$;

  constructor(
    private authStore: AuthStore,
    private favoritesStore: FavoritesStore,
    public translateService: TranslateService
  ) {}
}
