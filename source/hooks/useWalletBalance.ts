import {useEffect, useState} from 'react';

import {browser} from 'webextension-polyfill-ts';

import {DASH_SERVICE_MESSAGES} from '../Background/services/messages';

const useWalletBalance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    browser.runtime.onMessage.addListener(async (message): Promise<boolean> => {
      if (message.type === DASH_SERVICE_MESSAGES.BALANCE_UPDATED) {
        const newBalance = message.payload as number;
        setBalance(newBalance);
      }

      return true;
    });

    const getInitialBalance = async (): Promise<void> => {
      const walletBalance = (await browser.runtime.sendMessage({
        type: DASH_SERVICE_MESSAGES.GET_BALANCE,
      })) as number;

      setBalance(walletBalance);
    };

    getInitialBalance().catch(console.error);
  }, []);

  return {balance};
};

export default useWalletBalance;
