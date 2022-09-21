import {browser} from 'webextension-polyfill-ts';
import {Wallet, EVENTS, CONSTANTS} from '@dashevo/wallet-lib';

import MESSAGES from '../messages';
import DASH_SERVICE_MESSAGE from './messages';
import {HeadersSyncProgressInfo, TxSyncProgressInfo} from './types';

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

      this._wallet.on(
        EVENTS.HEADERS_SYNC_PROGRESS,
        async (progressInfo: HeadersSyncProgressInfo) => {
          await browser.runtime.sendMessage({
            type: DASH_SERVICE_MESSAGE.HEADERS_SYNC_PROGRESS_UPDATED,
            payload: progressInfo,
          });
        }
      );

      this._wallet.on(
        EVENTS.TX_SYNC_PROGRESS,
        async (progressInfo: TxSyncProgressInfo) => {
          await browser.runtime.sendMessage({
            type: DASH_SERVICE_MESSAGE.TX_SYNC_PROGRESS_UPDATED,
            payload: progressInfo,
          });
        }
      );

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
        await this.init();
        return true;
      case MESSAGES.SYNC_WALLET:
        this.syncWallet();
        return true;
      default:
        return true;
    }
  }
}

export default DashService;
