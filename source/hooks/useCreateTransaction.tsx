import {useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import moneyFormatter from '../utils/moneyFormatter';
import {DASH_SERVICE_MESSAGES} from '../Background/services/messages';

type TransactionInfo = {
  changeIndex: number;
  changeScript: string;
  fee: number;
  hash: string;
  inputs: [];
  nLockTime: number;
  outputs: [];
  version: number;
};

const useCreateTransaction = () => {
  const [transaction, setTransaction] = useState<TransactionInfo>();
  const handleCreateTransaction = async (data: {
    amount: number;
    address: string;
  }): Promise<void> => {
    const options = {
      satoshis: moneyFormatter.formatSatoshis(+data.amount),
      recipient: data.address,
    };
    const result = await browser.runtime.sendMessage({
      type: DASH_SERVICE_MESSAGES.CREATE_TRANSACTION,
      payload: options,
    });

    setTransaction(result);
  };

  const handleBroadcastTransaction = async (
    data: TransactionInfo
  ): Promise<string> => {
    return browser.runtime.sendMessage({
      type: DASH_SERVICE_MESSAGES.BROADCAST_TRANSACTION,
      payload: data,
    });
  };

  return {handleCreateTransaction, transaction, handleBroadcastTransaction};
};

export default useCreateTransaction;
