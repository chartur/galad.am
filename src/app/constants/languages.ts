export const languages = ["am", "en", "ru"];

export const defaultLanguage = "am";

export let selectedLanguage = defaultLanguage;

export function setSelectedLanguage(lang?: string) {
  if (!lang || !languages.includes(lang)) {
    selectedLanguage = defaultLanguage;
    return;
  }

  selectedLanguage = lang;
}
