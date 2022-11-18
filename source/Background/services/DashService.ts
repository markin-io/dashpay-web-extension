// eslint-disable-next-line
// @ts-ignore
import {Transaction} from '@dashevo/dashcore-lib';

import {Wallet, EVENTS, CONSTANTS} from '@dashevo/wallet-lib';
import localforage from 'localforage';
import {browser} from 'webextension-polyfill-ts';

import DASH_SERVICE_MESSAGE from './messages';
import {
  HeadersSyncProgressInfo,
  TxSyncProgressInfo,
  SyncProgressInfo,
  TransactionHistoryItem,
  CreateTransactionPayload,
} from './types';
import FiatConversionService from './FiatConversionService';

export type Message = {type: string; payload: unknown};

class DashService {
  static MESSAGES = DASH_SERVICE_MESSAGE;

  private _wallet: any;

  private _fiatConversationService = FiatConversionService.getInstance();

  constructor() {
    this.init = this.init.bind(this);
    this.syncWallet = this.syncWallet.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.getCurrentSyncProgress = this.getCurrentSyncProgress.bind(this);
  }

  async init(): Promise<unknown> {
    const {mnemonic} = await browser.storage.local.get('mnemonic');

    if (!this._wallet) {
      this._wallet = new Wallet({
        network: 'testnet',
        mnemonic,
        adapter: localforage,
        storage: {
          purgeOnError: false,
          autoSave: true,
        },
      });

      const storageInitPromise = new Promise((resolve, reject) => {
        this._wallet.storage.on(EVENTS.REHYDRATE_STATE_SUCCESS, resolve);
        this._wallet.storage.on(EVENTS.REHYDRATE_STATE_FAILED, reject);
      });

      this._wallet.on('error', console.error);

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
        EVENTS.TRANSACTIONS_SYNC_PROGRESS,
        async (progressInfo: TxSyncProgressInfo) => {
          await browser.runtime.sendMessage({
            type: DASH_SERVICE_MESSAGE.TX_SYNC_PROGRESS_UPDATED,
            payload: progressInfo,
          });
        }
      );

      this._wallet.on(EVENTS.BLOCKHEIGHT_CHANGED, async () => {
        setTimeout(async () => {
          const account = await this._wallet.getAccount({synchronize: false});
          const transactionHistory = await account.getTransactionHistory();
          await browser.runtime.sendMessage({
            type: DASH_SERVICE_MESSAGE.TRANSACTION_HISTORY_UPDATED,
            payload: transactionHistory,
          });
        }, 500);
      });

      this._wallet.on(EVENTS.CONFIRMED_TRANSACTION, (data: unknown) => {
        console.log('Confirmed tx', data);
      });

      const account = await this._wallet.getAccount();
      this._wallet.on(EVENTS.FETCHED_CONFIRMED_TRANSACTION, async () => {
        setTimeout(async () => {
          const balance = await account.getTotalBalance();
          const transactionHistory = await account.getTransactionHistory();
          await browser.runtime.sendMessage({
            type: DASH_SERVICE_MESSAGE.BALANCE_UPDATED,
            payload: balance,
          });
          await browser.runtime.sendMessage({
            type: DASH_SERVICE_MESSAGE.TRANSACTION_HISTORY_UPDATED,
            payload: transactionHistory,
          });
        }, 100);
      });

      account.on(EVENTS.INITIALIZED, () => {
        browser.runtime.sendMessage({type: DASH_SERVICE_MESSAGE.INITIALIZED});
      });
      await storageInitPromise;
    }
    this._fiatConversationService.initConversationRate();

    return true;
  }

  async syncWallet(): Promise<void> {
    if (this._wallet.state === CONSTANTS.WALLET_STATES.OFFLINE) {
      const account = await this._wallet.getAccount();
      account.init().catch(console.error);
    }
  }

  async getTotalBalance(): Promise<number> {
    const account = await this._wallet.getAccount({synchronize: false});
    return account.getTotalBalance();
  }

  async getTransactionHistory(): Promise<TransactionHistoryItem[]> {
    const account = await this._wallet.getAccount({synchronize: false});
    return account.getTransactionHistory();
  }

  async getUnusedAddress(): Promise<string> {
    const account = await this._wallet.getAccount({synchronize: false});
    return account.getUnusedAddress();
  }

  async getInitialStatus(): Promise<boolean> {
    const account = await this._wallet.getAccount({synchronize: false});
    return account.isInitialized();
  }

  async createTransaction({
    recipient,
    satoshis,
  }: CreateTransactionPayload): Promise<Transaction> {
    const account = await this._wallet.getAccount({synchronize: false});
    return account.createTransaction({recipient, satoshis});
  }

  async broadcastTransaction(transaction: Transaction): Promise<string> {
    const account = await this._wallet.getAccount({synchronize: false});
    return account.broadcastTransaction(transaction);
  }

  getCurrentSyncProgress(): SyncProgressInfo {
    const chainStore = this._wallet.storage.getDefaultChainStore();

    const {chainHeight, lastSyncedHeaderHeight, lastSyncedBlockHeight} =
      chainStore.state;

    const totalCount = chainHeight + 1;
    const totalSyncedCount = lastSyncedHeaderHeight + 1;

    const progress = Math.round((totalSyncedCount / totalCount) * 1000) / 10;

    const headersSyncProgressInfo = {
      confirmedProgress: progress,
      totalProgress: progress,
      confirmedSyncedCount: totalSyncedCount,
      totalSyncedCount,
      totalCount,
    };

    const syncedBlocksCount = lastSyncedBlockHeight + 1;
    const txSyncProgress =
      Math.round((syncedBlocksCount / totalCount) * 1000) / 10;

    const txSyncProgressInfo = {
      progress: txSyncProgress,
      syncedBlocksCount,
      totalBlocksCount: totalCount,
      transactionsCount: chainStore.state.transactions.size,
    };

    return {txSyncProgressInfo, headersSyncProgressInfo};
  }

  getInitialUsdRate(): number {
    return this._fiatConversationService.getFiatConversationRate();
  }

  async handleMessage(message: Message): Promise<unknown> {
    switch (message.type) {
      case DashService.MESSAGES.INIT_WALLET:
        await this.init();
        break;
      case DashService.MESSAGES.SYNC_WALLET:
        await this.syncWallet();
        break;
      case DashService.MESSAGES.INIT_STATUS:
        return this.getInitialStatus();
      case DashService.MESSAGES.GET_CURRENT_SYNC_PROGRESS:
        return this.getCurrentSyncProgress();
      case DashService.MESSAGES.GET_BALANCE:
        return this.getTotalBalance();
      case DashService.MESSAGES.GET_TRANSACTION_HISTORY:
        return this.getTransactionHistory();
      case DashService.MESSAGES.CREATE_TRANSACTION:
        return this.createTransaction(
          message.payload as CreateTransactionPayload
        );
      case DashService.MESSAGES.BROADCAST_TRANSACTION:
        return this.broadcastTransaction(new Transaction(message.payload));
      case DashService.MESSAGES.GET_UNUSED_ADDRESS:
        return this.getUnusedAddress();
      case DashService.MESSAGES.GET_FIAT_CONVERSION_RATE:
        return this.getInitialUsdRate();
      default:
        break;
    }

    return true;
  }
}

export default DashService;
