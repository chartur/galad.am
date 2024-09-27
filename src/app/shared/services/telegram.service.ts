import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TelegramService {
  private app: any;

  public init(): void {
    this.app = (window as any).Telegram.WebApp;
    this.app.expand();
    this.app.enableClosingConfirmation();
    this.app.setHeaderColor('#11152a');
    this.app.ready();
  }
}
