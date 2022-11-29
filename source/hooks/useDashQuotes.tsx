import {useEffect, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {QUOTES_SERVICE_MESSAGES} from '../Background/services/messages';

const useDashQuotes = () => {
  const [dashUsdRate, setDashUsdRate] = useState(0);
  useEffect(() => {
    browser.runtime.onMessage.addListener(async (message): Promise<void> => {
      if (message.type === QUOTES_SERVICE_MESSAGES.DASH_USD_RATE_UPDATED) {
        setDashUsdRate(message.payload);
      }
    });

    const getInitialUsdRate = async (): Promise<void> => {
      const result = await browser.runtime.sendMessage({
        type: QUOTES_SERVICE_MESSAGES.GET_DASH_USD_RATE,
      });
      setDashUsdRate(result);
    };
    getInitialUsdRate().catch(console.error);
  }, []);
  return {dashUsdRate};
};

export default useDashQuotes;
