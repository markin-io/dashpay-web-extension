import {useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import moneyFormatter from '../utils/moneyFormatter';
import DASH_SERVICE_MESSAGES from '../Background/services/messages';
import {TransactionInfo} from '../Background/services/types';

const useCreateTransaction = () => {
  const [transaction, setTransaction] = useState<TransactionInfo>();
  const handleCreateTransaction = async (data: {
    amount: number;
    address: string;
  }): Promise<void> => {
    console.log(
      data.amount,
      +moneyFormatter.formatSatoshis(+data.amount).toFixed()
    );
    const options = {
      satoshis: +moneyFormatter.formatSatoshis(+data.amount).toFixed(),
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
  ): Promise<unknown> => {
    const result = await browser.runtime.sendMessage({
      type: DASH_SERVICE_MESSAGES.BROADCAST_TRANSACTION,
      payload: data,
    });
    return result;
  };

  return {handleCreateTransaction, transaction, handleBroadcastTransaction};
};

export default useCreateTransaction;
