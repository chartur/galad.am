import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthStore} from "@stores/auth.store";
import {filter, fromEvent, Observable, Subscription} from "rxjs";
import {User} from "@interfaces/user";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-profile-actions-list',
  templateUrl: './profile-actions-list.component.html',
  styleUrl: './profile-actions-list.component.scss'
})
export class ProfileActionsListComponent implements OnInit, OnDestroy  {
  public user$: Observable<User> = this.authStore.user$;
  public showDropdown: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authStore: AuthStore,
    public translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.subscribeDocumentClick();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  public logout(): void {
    this.authStore.logout()
  }

  private subscribeDocumentClick(): void {
    this.subscriptions.add(
      fromEvent(document, 'click').pipe(
        filter(() => !!this.showDropdown)
      )
        .subscribe(() => {
          this.showDropdown = false;
        })
    )
  }
}
