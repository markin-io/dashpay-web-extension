import {useEffect, useState} from 'react';

import {browser} from 'webextension-polyfill-ts';

import {
  HeadersSyncProgressInfo,
  Message,
  SyncProgressInfo,
  TxSyncProgressInfo,
} from '../Background/services/types';
import {DASH_SERVICE_MESSAGES} from '../Background/services/messages';

const useWalletSyncProgress = () => {
  const [initialized, setInitialized] = useState(false);

  const [headersSyncProgressInfo, setHeadersSyncProgressInfo] =
    useState<HeadersSyncProgressInfo>({
      confirmedProgress: 0,
      totalProgress: 0,
      confirmedSyncedCount: 0,
      totalSyncedCount: 0,
      totalCount: 0,
    });

  const [txSyncProgressInfo, setTxSyncProgressInfo] =
    useState<TxSyncProgressInfo>({
      progress: 0,
      syncedBlocksCount: 0,
      totalBlocksCount: 0,
      transactionsCount: 0,
    });

  useEffect(() => {
    browser.runtime.onMessage.addListener(
      async (message: Message): Promise<boolean> => {
        if (
          message.type === DASH_SERVICE_MESSAGES.HEADERS_SYNC_PROGRESS_UPDATED
        ) {
          setHeadersSyncProgressInfo(
            message.payload as HeadersSyncProgressInfo
          );
        } else if (
          message.type === DASH_SERVICE_MESSAGES.TX_SYNC_PROGRESS_UPDATED
        ) {
          setTxSyncProgressInfo(message.payload as TxSyncProgressInfo);
        } else if (message.type === DASH_SERVICE_MESSAGES.INITIALIZED) {
          setInitialized(true);
        }

        return true;
      }
    );

    const getSyncProgressInfo = async (): Promise<void> => {
      const syncProgressInfo = (await browser.runtime.sendMessage({
        type: DASH_SERVICE_MESSAGES.GET_CURRENT_SYNC_PROGRESS,
      })) as SyncProgressInfo;

      setTxSyncProgressInfo(syncProgressInfo.txSyncProgressInfo);
      setHeadersSyncProgressInfo(syncProgressInfo.headersSyncProgressInfo);
    };

    const getInitStatus = async (): Promise<boolean> => {
      return browser.runtime.sendMessage({
        type: DASH_SERVICE_MESSAGES.INIT_STATUS,
      });
    };

    getInitStatus()
      .then((res) => setInitialized(res))
      .catch(console.error);

    getSyncProgressInfo().catch(console.error);
  }, []);

  return {headersSyncProgressInfo, txSyncProgressInfo, initialized};
};

export default useWalletSyncProgress;
