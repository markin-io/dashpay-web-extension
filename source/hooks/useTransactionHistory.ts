import {useEffect, useState} from 'react';

import {browser} from 'webextension-polyfill-ts';

import DASH_SERVICE_MESSAGES from '../Background/services/messages';
import {TransactionHistoryItem} from '../Background/services/types';

const useTransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionHistoryItem[]
  >([]);

  useEffect(() => {
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
