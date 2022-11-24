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
  const [newAccount, setNewAccount] = useState(false);

  useEffect(() => {
    const initSdk = async (): Promise<void> => {
      await browser.runtime.sendMessage({type: MESSAGES.INIT});
      await browser.runtime.sendMessage({
        type: DASH_SERVICE_MESSAGES.INIT_WALLET,
      });
      setLoading(false);
    };

    browser.storage.local.get('mnemonic').then((res) => {
      if (res?.mnemonic) {
        initSdk().catch(console.error);
      } else {
        setNewAccount(true);
      }
    });
  }, []);

  return loading ? <Splash newAccount={newAccount} /> : <Outlet />;
};

export default Popup;
