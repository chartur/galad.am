import { TranslateService } from "@ngx-translate/core";
import {languages, selectedLanguage} from "../constants/languages";

export function languageInitializerFactory(translateService: TranslateService) {
  return () => {
    translateService.addLangs(languages);
    translateService.use(selectedLanguage);
  }
}
