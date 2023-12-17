import { Component } from '@angular/core';
import { FavoritesStore } from "@stores/favorites.store";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header-actions-button',
  templateUrl: './header-actions-button.component.html',
  styleUrls: ['./header-actions-button.component.scss']
})
export class HeaderActionsButtonComponent {
  public favoritesCount$ = this.favoritesStore.count$;

  constructor(
    private favoritesStore: FavoritesStore,
    public translateService: TranslateService
  ) {
  }
}
