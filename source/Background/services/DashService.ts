import {browser} from 'webextension-polyfill-ts';
import {Wallet, EVENTS, CONSTANTS} from '@dashevo/wallet-lib';

import MESSAGES from '../messages';

export type Message = {type: string; payload: unknown};

class DashService {
  private _wallet: any;

  constructor() {
    this.init = this.init.bind(this);
    this.syncWallet = this.syncWallet.bind(this);
    this.messageListener = this.messageListener.bind(this);

    browser.runtime.onMessage.addListener(this.messageListener);
  }

  async init(): Promise<unknown> {
    if (!this._wallet) {
      this._wallet = new Wallet({
        network: 'testnet',
        mnemonic:
          'fever empty hotel donor chase funny photo honey economy near filter confirm',
      });

      return new Promise((resolve, reject) => {
        this._wallet.storage.on(EVENTS.REHYDRATE_STATE_SUCCESS, resolve);
        this._wallet.storage.on(EVENTS.REHYDRATE_STATE_FAILED, reject);
      });
    }

    return null;
  }

  syncWallet(): void {
    if (this._wallet.state === CONSTANTS.WALLET_STATES.OFFLINE) {
      this._wallet.getAccount();
    }
  }

  async messageListener(message: Message): Promise<unknown> {
    switch (message.type) {
      case MESSAGES.INIT_WALLET:
        console.log('Wall', this._wallet);
        await this.init();
        break;
      case MESSAGES.SYNC_WALLET:
        this.syncWallet();
        return null;
      default:
        return null;
    }

    return null;
  }
}

export default DashService;
