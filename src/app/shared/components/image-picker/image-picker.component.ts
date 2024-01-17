import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {publicPath} from "@environment/environment";

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrl: './image-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ImagePickerComponent),
    }
  ]
})
export class ImagePickerComponent implements ControlValueAccessor {
  image: ImagerPickerValue = {
    newSelected: false,
    data: ''
  };
  get src(): string | ArrayBuffer {
    if (!this.image.data) {
      return this.placeholder;
    }

    if (!this.image.newSelected) {
      return publicPath(this.image.data as string);
    }

    return this.image.data;
  }
  private placeholder: string = '/assets/images/placeholders/image-picker.png';

  onChange = (image: ImagerPickerValue) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;


  selectImage(event: Event) {
    this.markAsTouched();
    if (!this.disabled) {
      this.readURL(event)
    }
  }

  writeValue(image: ImagerPickerValue) {
    this.image = image;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  readURL(event: Event): void {
    const target = event.target as any;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.image = {
          newSelected: true,
          data: reader.result
        };

        this.onChange(this.image);
      };

      reader.readAsDataURL(file);
    }
  }
}

export interface ImagerPickerValue {
  data: string | ArrayBuffer;
  newSelected?: boolean;
}
