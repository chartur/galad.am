import {TranslateService} from "@ngx-translate/core";
import {inject} from "@angular/core";

export class ClassTranslator {
  constructor(
    public data: any,
    private translateService: TranslateService
  ) {}

  public init() {
    const lang = this.translateService.currentLang;
    return new Proxy(this.data, {
      get(target: any, p: string, receiver: any): any {
        return (target as any)[lang + '_' + p];
      }
    })
  }
}
