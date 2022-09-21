import {useEffect, useState} from 'react';

import {browser} from 'webextension-polyfill-ts';

import {
  HeadersSyncProgressInfo,
  TxSyncProgressInfo,
} from '../Background/services/types';
import DASH_SERVICE_MESSAGES from '../Background/services/messages';

const useWalletSyncProgress = () => {
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
    browser.runtime.onMessage.addListener(async (message): Promise<boolean> => {
      console.log(message);
      if (
        message.type === DASH_SERVICE_MESSAGES.HEADERS_SYNC_PROGRESS_UPDATED
      ) {
        setHeadersSyncProgressInfo(message.payload as HeadersSyncProgressInfo);
      } else if (
        message.type === DASH_SERVICE_MESSAGES.TX_SYNC_PROGRESS_UPDATED
      ) {
        setTxSyncProgressInfo(message.payload as TxSyncProgressInfo);
      }

      return true;
    });
  }, []);

  return {headersSyncProgressInfo, txSyncProgressInfo};
};

export default useWalletSyncProgress;
