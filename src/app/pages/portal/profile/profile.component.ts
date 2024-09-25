import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClassValidator} from "../../../shared/utils/class-validator";
import {AuthStore} from "@stores/auth.store";
import {User} from "@interfaces/user";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {SystemMessages} from "@constants/system-messages";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  public personalSettingsForm: FormGroup;
  public passwordsSettingsForm: FormGroup;
  public user: User;
  public personalSettingsChanged: boolean = false;
  private subscriptions: Subscription = new Subscription();
  private personalSettingsFormValueChangesSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authStore: AuthStore,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.authStore.user$
        .subscribe((user) => {
          this.user = user;
          this.personalSettingsFormValueChangesSubscription?.unsubscribe()
          this.initPasswordsSettingsForm();
          this.initPersonalSettingsForm();
          this.checkIfPersonalSettingsChanged();
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.personalSettingsFormValueChangesSubscription?.unsubscribe();
  }

  async personalSettingsSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.personalSettingsForm.invalid || !this.personalSettingsChanged) {
      this.toastrService.error(SystemMessages.form.INVALID)
      return;
    }
    const values = this.personalSettingsForm.value;
    const form = new FormData();
    form.append('email', values.email);
    form.append('fullName', values.fullName);
    form.append('phone', values.phone);
    if (values.image.newSelected) {
      form.append('image', await fetch(values.image.data).then(res => res.blob()));
    }
    this.authStore.updatePersonalSettings(form);
  }

  async passwordSettingsSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.passwordsSettingsForm.invalid) {
      this.toastrService.error(SystemMessages.form.INVALID)
      return;
    }
    const values = this.passwordsSettingsForm.value;
    this.authStore.updatePasswordSettings(values);
    this.passwordsSettingsForm.reset();
  }

  private initPersonalSettingsForm(): void {
    this.personalSettingsForm = this.formBuilder.group({
      fullName: this.formBuilder.control({ value: this.user.fullName, disabled: false }, [
        Validators.required,
      ]),
      email: this.formBuilder.control({ value: this.user.email, disabled: false }, [
        Validators.required,
        Validators.email
      ]),
      phone: this.formBuilder.control({ value: this.user.phone, disabled: false }, [
        Validators.required,
        Validators.pattern('[- +()0-9]+')
      ]),
      image: this.formBuilder.control({
        value: { newSelected: !this.user.image, data: this.user.image },
        disabled: false
      })
    });

    this.personalSettingsFormValueChangesSubscription = this.personalSettingsForm.valueChanges.subscribe(
      () => {
        this.checkIfPersonalSettingsChanged()
      }
    );
  }

  private initPasswordsSettingsForm(): void {
    this.passwordsSettingsForm = this.formBuilder.group({
      password: this.formBuilder.control({ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: this.formBuilder.control({ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(6)
      ])
    }, {
      validators: [ClassValidator.compareFieldValuesOfForm("password", "confirmPassword")]
    })
  }

  private checkIfPersonalSettingsChanged(): void {
    const { fullName, email, phone, image } = this.personalSettingsForm.value;
    this.personalSettingsChanged = fullName.trim() !== this.user.fullName.trim()
      || email.toLowerCase().trim() !== this.user.email.toLowerCase().trim()
      || phone?.toLowerCase()?.trim() !== this.user?.phone?.toLowerCase()?.trim()
      || image.data !== this.user.image;
  }
}
