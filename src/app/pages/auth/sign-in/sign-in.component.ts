import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthStore} from "@stores/auth.store";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  public signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authStore: AuthStore,
    public translateService: TranslateService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  submit(event: Event): void {
    event.preventDefault();
    const data = this.signInForm.value;
    this.authStore.signIn(data);
  }

  private buildForm(): void {
    this.signInForm = this.formBuilder.group({
      email: this.formBuilder.control({value: '', disabled: false}, [
        Validators.required,
        Validators.email
      ]),
      password: this.formBuilder.control({value: '', disabled: false}, [
        Validators.required,
        Validators.minLength(6)
      ]),
    })
  }
}
