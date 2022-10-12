import * as React from 'react';

import './styles.scss';
import {useEffect, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {Outlet} from 'react-router-dom';
import Splash from '../screens/Splash';
import MESSAGES from '../Background/messages';
import DASH_SERVICE_MESSAGES from '../Background/services/messages';

const Popup: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSdk = async (): Promise<void> => {
      await browser.runtime.sendMessage({type: MESSAGES.INIT});
      await browser.runtime.sendMessage({
        type: DASH_SERVICE_MESSAGES.INIT_WALLET,
      });
      setLoading(false);
    };

    initSdk().catch(console.error);
  }, []);

  return loading ? <Splash /> : <Outlet />;
};

export default Popup;
