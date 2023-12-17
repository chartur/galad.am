import { InjectionToken } from "@angular/core";
import { localStorageFactory } from "@factories/local-storage.factory";

export const LOCAL_STORAGE_TOKEN = new InjectionToken<any>("LOCAL_STORAGE", {
  providedIn: "root",
  factory: localStorageFactory
});
