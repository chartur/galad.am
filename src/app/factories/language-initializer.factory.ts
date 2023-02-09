import { TranslateService } from "@ngx-translate/core";
import { defaultLanguage, languages } from "../constants/languages";

export function languageInitializerFactory(translateService: TranslateService) {
  return () => {
    translateService.addLangs(languages);
  }
}
