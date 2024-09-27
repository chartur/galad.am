import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class TelegramService {
  private app: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public init(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.app = (window as any).Telegram.WebApp;
      this.app.expand();
      this.app.enableClosingConfirmation();
      this.app.setHeaderColor('#11152a');
      this.app.ready();
    }
  }
}
