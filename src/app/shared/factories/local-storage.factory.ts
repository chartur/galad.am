import {inject, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

export const localStorageFactory = (): Storage => {
  const platform = inject(PLATFORM_ID);
  if (isPlatformBrowser(platform)) {
    return localStorage;
  }
  return {
    getItem(key: string): string | null {
      return null;
    },
    setItem(key: string, value: string) {},
    clear() {}
  } as Storage;
}
