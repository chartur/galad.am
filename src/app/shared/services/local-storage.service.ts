import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE_TOKEN } from "../injection-tokens/local-storage.token";
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage_path = "galad_admin_storage_path";

  constructor(
    @Inject(LOCAL_STORAGE_TOKEN) private storage: Storage
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
    this.storage.clear();
  }

  private get store(): Record<string, any> {
    const storage = this.storage.getItem(this.storage_path);
    return storage ? JSON.parse(storage) : {};
  }

  private set store(data) {
    this.storage.setItem(this.storage_path, JSON.stringify(data));
  }
}
