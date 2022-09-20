import * as React from 'react';

import './styles.scss';
import {useEffect, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import MESSAGES from '../Background/messages';

const Popup: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSdk = async (): Promise<void> => {
      await browser.runtime.sendMessage({type: MESSAGES.INIT});
      await browser.runtime.sendMessage({type: MESSAGES.INIT_SDK});
      setLoading(false);
    };

    initSdk().catch(console.error);
  }, []);

  return loading ? <Splash /> : <Home />;
};

export default Popup;
