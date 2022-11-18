import {useEffect, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import DASH_SERVICE_MESSAGES from '../Background/services/messages';

const useFiatConversionRate = () => {
  const [fiatRate, setFiatRate] = useState(0);
  useEffect(() => {
    browser.runtime.onMessage.addListener(async (message): Promise<void> => {
      if (message.type === DASH_SERVICE_MESSAGES.FIAT_CONVERSION_RATE_UPDATED) {
        setFiatRate(message.payload);
      }
    });

    const getInitialUsdRate = async (): Promise<void> => {
      const result = await browser.runtime.sendMessage({
        type: DASH_SERVICE_MESSAGES.GET_FIAT_CONVERSION_RATE,
      });
      setFiatRate(result);
    };
    getInitialUsdRate().catch(console.error);
  }, []);
  return {fiatRate};
};

export default useFiatConversionRate;
