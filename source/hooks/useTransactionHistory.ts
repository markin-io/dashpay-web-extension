import {useEffect, useState} from 'react';

import {browser} from 'webextension-polyfill-ts';

import DASH_SERVICE_MESSAGES from '../Background/services/messages';
import {TransactionHistoryItem} from '../Background/services/types';

const useTransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionHistoryItem[]
  >([]);

  useEffect(() => {
    browser.runtime.onMessage.addListener(async (message): Promise<boolean> => {
      if (message.type === DASH_SERVICE_MESSAGES.TRANSACTION_HISTORY_UPDATED) {
        const updatedHistory = message.payload as TransactionHistoryItem[];
        setTransactionHistory(updatedHistory);
      }

      return true;
    });

    const getInitialHistory = async (): Promise<void> => {
      const history = (await browser.runtime.sendMessage({
        type: DASH_SERVICE_MESSAGES.GET_TRANSACTION_HISTORY,
      })) as TransactionHistoryItem[];
      setTransactionHistory(history);
    };

    getInitialHistory().catch(console.error);
  }, []);

  return {transactionHistory};
};

export default useTransactionHistory;
