import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Pipe({
  name: 'customPrice',
  pure: false
})
export class CustomPricePipe implements PipeTransform {

  constructor(
    private translateService: TranslateService
  ) {}

  transform(value: number): string {
    const amd = this.translateService.instant("AMD");
    return `${Number(value)} ${amd}`;
  }

}
