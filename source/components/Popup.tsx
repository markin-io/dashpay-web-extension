import * as React from 'react';
import {useEffect, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {Outlet, useNavigate} from 'react-router-dom';
import Splash from '../screens/Splash';
import MESSAGES from '../Background/messages';
import {DASH_SERVICE_MESSAGES} from '../Background/services/messages';
import './styles.scss';
import Intro from './Intro/Intro';

async function initSdk(fn: () => void): Promise<void> {
  await browser.runtime.sendMessage({type: MESSAGES.INIT});
  await browser.runtime.sendMessage({
    type: DASH_SERVICE_MESSAGES.INIT_WALLET,
  });
  fn();
}

const Popup: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [emptyMnemonic, setEmptyMnemonic] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    browser.storage.local.get('mnemonic').then((res) => {
      if (res?.mnemonic) {
        initSdk(() => setLoading(false)).catch(console.error);
      } else {
        setEmptyMnemonic(true);
        setLoading(false);
      }
    });
  }, []);

  const handleCreateMnemonic = (): void => {
    initSdk(() => undefined)
      .then(() => navigate('/create'))
      .catch(console.error);
  };

  if (loading) {
    return <Splash />;
  }

  return emptyMnemonic ? (
    <Intro onCreateMnemonic={handleCreateMnemonic} />
  ) : (
    <Outlet />
  );
};

export default Popup;
