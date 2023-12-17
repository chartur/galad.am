import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClassValidator} from "../../../shared/utils/class-validator";
import {values} from "lodash";
import {AuthStore} from "@stores/auth.store";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

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
    const data = {
      ...this.signUpForm.value,
      confirmPassword: undefined
    };
    this.authStore.signUp(data);
  }

  private buildForm(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: this.formBuilder.control({value: '', disabled: false}, [
        Validators.required,
      ]),
      email: this.formBuilder.control({value: '', disabled: false}, [
        Validators.required,
        Validators.email
      ]),
      password: this.formBuilder.control({value: '', disabled: false}, [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: this.formBuilder.control({value: '', disabled: false}, [
        Validators.required,
        Validators.minLength(6),
      ]),
    }, {
      validators: ClassValidator.compareFieldValuesOfForm('password', 'confirmPassword')
    })
  }
}
