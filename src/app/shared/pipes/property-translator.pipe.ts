import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { map, merge, Observable, of } from "rxjs";

@Pipe({
  name: 'propertyTranslator',
})
export class PropertyTranslatorPipe implements PipeTransform {

  constructor(
    private translateService: TranslateService,
  ) {
  }

  transform(value: any, property: string): Observable<string> {
    return merge(
      of(this.translateService.currentLang).pipe(
        map((lang) => value[lang + "_" + property])
      ),
      this.translateService.onLangChange.pipe(
        map((event) => value[event.lang + "_" + property])
      )
    )
  }
}
