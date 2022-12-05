import * as React from 'react';
import {useEffect, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {Outlet} from 'react-router-dom';
import Splash from '../screens/Splash';
import MESSAGES from '../Background/messages';
import {DASH_SERVICE_MESSAGES} from '../Background/services/messages';
import './styles.scss';

async function initSdk(fn: () => void): Promise<void> {
  await browser.runtime.sendMessage({type: MESSAGES.INIT});
  await browser.runtime.sendMessage({
    type: DASH_SERVICE_MESSAGES.INIT_WALLET,
  });
  fn();
}

const Popup: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [newAccount, setNewAccount] = useState(false);

  useEffect(() => {
    browser.storage.local.get('mnemonic').then((res) => {
      if (res?.mnemonic) {
        initSdk(() => setLoading(false)).catch(console.error);
      } else {
        setLoading(true);
        setNewAccount(true);
      }
    });
  }, []);

  const handleCreateMnemonic = (): void => {
    initSdk(() => undefined).catch(console.error);
  };

  return loading ? (
    <Splash newAccount={newAccount} onCreate={handleCreateMnemonic} />
  ) : (
    <Outlet />
  );
};

export default Popup;
