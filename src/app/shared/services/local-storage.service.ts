import { Inject, Injectable } from '@angular/core';
import * as _ from "lodash";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  static storage_path = "galad_storage_path";

  constructor(
    private storage: CookieService
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
    this.storage.delete("galad_storage_path");
  }

  private get store(): Record<string, any> {
    const storage = this.storage.get(LocalStorageService.storage_path);
    return storage ? JSON.parse(storage) : {};
  }

  private set store(data) {
    this.storage.set(LocalStorageService.storage_path, JSON.stringify(data), null, '/');
  }
}
