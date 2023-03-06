import { TranslateService } from "@ngx-translate/core";
import { languages } from "../constants/languages";

export function languageInitializerFactory(translateService: TranslateService) {
  return () => {
    translateService.addLangs(languages);
  }
}
