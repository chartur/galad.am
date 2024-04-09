import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: 'propertyTranslatorCheck',
  pure: false
})
export class PropertyTranslatorCheckPipe implements PipeTransform {

  constructor(
    private translateService: TranslateService,
  ) {
  }

  transform(value: any, property: string): boolean {
    return !!value[this.translateService.currentLang + "_" + property]
  }
}
