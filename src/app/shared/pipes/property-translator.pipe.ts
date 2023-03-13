import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";

@Pipe({
  name: 'propertyTranslator',
  pure: false,
})
export class PropertyTranslatorPipe implements PipeTransform {

  constructor(
    private translateService: TranslateService,
  ) {
  }

  transform(value: any, property: string): Observable<string> {
    return value[this.translateService.currentLang + "_" + property]
  }
}
