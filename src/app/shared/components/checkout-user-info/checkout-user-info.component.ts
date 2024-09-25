import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap/modal";
import {AuthStore} from "@stores/auth.store";
import {Subject, Subscription} from "rxjs";
import {User} from "@interfaces/user";

@Component({
  selector: 'app-checkout-user-info',
  templateUrl: './checkout-user-info.component.html',
  styleUrl: './checkout-user-info.component.scss'
})
export class CheckoutUserInfoComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public user: User;
  private subscriptions: Subscription = new Subscription();
  private onClose: Subject<{ email: string, phone: string }> = new Subject<{email: string; phone: string}>();

  constructor(
    private formBuilder: FormBuilder,
    private bsModalService: BsModalService,
    private authStore: AuthStore
  ) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.authStore.user$.subscribe((user) => {
        this.user = user;
        this.initForm();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public hide(): void {
    this.onClose.next(null);
    this.bsModalService.hide();
  }

  public submit(event: Event): void {
    event.preventDefault();
    this.onClose.next(this.form.value);
    this.bsModalService.hide();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [this.user?.phone, Validators.required]
    });
  }
}
