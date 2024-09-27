import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import * as _ from "lodash";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  static storage_path = "galad_storage_path";

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public get<T>(path: string): T {
    return _.get(this.store, path);
  }

  public set<T>(property: string, value: T): void {
    const storage = this.store;
    _.set(storage, property, value);
    this.store = storage;
  }

  public destroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(LocalStorageService.storage_path);
    }
  }

  private get store(): Record<string, any> {
    if (!isPlatformBrowser(this.platformId)) {
      return {};
    }
    const storage = localStorage.getItem(LocalStorageService.storage_path);
    return storage ? JSON.parse(storage) : {};
  }

  private set store(data) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(LocalStorageService.storage_path, JSON.stringify(data));
    }
  }
}
