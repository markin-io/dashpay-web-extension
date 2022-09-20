import Dash from 'dash';

import {browser} from 'webextension-polyfill-ts';
import MESSAGES from '../messages';

const {EVENTS} = Dash.WalletLib;

export type Message = {
  type: string;
  payload: unknown;
};

class DashService {
  private _dashClient: any;

  constructor() {
    this.init = this.init.bind(this);
    this.messageListener = this.messageListener.bind(this);

    browser.runtime.onMessage.addListener(this.messageListener);
  }

  async init(): Promise<void> {
    this._dashClient = new Dash.Client({
      network: 'testnet',
      wallet: {
        mnemonic:
          'fever empty hotel donor chase funny photo honey economy near filter confirm',
      },
    });
    return new Promise((resolve, reject) => {
      const {wallet} = this._dashClient;
      wallet.storage.on(EVENTS.REHYDRATE_STATE_SUCCESS, resolve);
      wallet.storage.on(EVENTS.REHYDRATE_STATE_FAILED, reject);
    });
  }

  async messageListener(message: Message): Promise<unknown> {
    switch (message.type) {
      case MESSAGES.INIT_SDK:
        await this.init();
        break;
      case MESSAGES.GET_ACCOUNT:
        // dashService.getAccount();
        return 'll';
      default:
        return 0;
    }

    return 0;
  }

  async getAccount(): Promise<void> {
    await this._dashClient.wallet.getAccount();
  }
}

export default DashService;
