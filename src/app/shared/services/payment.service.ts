import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {TonConnectUI} from '@tonconnect/ui';

import {appUrl, walletAddress} from "@environment/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private wallet: TonConnectUI;
  private _connected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly connected$ = this._connected.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  public async pay() {
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 300, // 60 sec
      messages: [
        {
          address: walletAddress,
          amount: "10000000",
        },
      ]
    }

    try {
      const result = await this.wallet.sendTransaction(transaction);

      // you can use signed boc to find the transaction
      console.log(result.boc)
      // const someTxData = await myAppExplorerService.getTransaction(result.boc);
      // alert('Transaction was sent successfully', someTxData);
    } catch (e) {
      console.log(e)
    }
  }

  public async connect(): Promise<void> {
    if (!this.wallet) {
      this.init();
    }
    if (!this.wallet?.connected) {
      await this.wallet.openModal();
    }
  }

  private init(): void {
    this.wallet = new TonConnectUI({
      manifestUrl: `${appUrl}/assets/tonconnect-manifest.json`,
    });

    this.wallet.onStatusChange((wI) => {
      this._connected.next(!!wI);
    })
  }
}
