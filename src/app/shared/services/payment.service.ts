import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {TonConnectUI} from '@tonconnect/ui';

import {appUrl} from "@environment/environment";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private wallet: TonConnectUI;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  public async pay() {
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      messages: [
        {
          address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
          amount: "20000000",
          // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
        },
        {
          address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
          amount: "60000000",
          // payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
        }
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

  private async init(): Promise<void> {
    this.wallet = new TonConnectUI({
      manifestUrl: `${appUrl}/assets/tonconnect-manifest.json`,
    });
    this.wallet.uiOptions = {
      actionsConfiguration: {
        twaReturnUrl: 'https://t.me/chart95'
      }
    };
    await this.wallet.openModal();
  }
}
