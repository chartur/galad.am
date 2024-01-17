import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrl: './counter-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CounterInputComponent),
    }
  ]
})
export class CounterInputComponent implements ControlValueAccessor {
  @Input() max: number;

  @Input() min: number = 1;

  @Input() value: number = 1;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  touched = false;

  disabled = false;

  onChange = (value: number) => {};

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: number): void {
    this.value = value;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  public countDown(): void {
    if (this.min !== undefined && this.value <= this.min) {
      return;
    }
    this.value--;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  public countUp(): void {
    if (this.max !== undefined && this.value >= this.max) {
      return;
    }
    this.value++;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
}
