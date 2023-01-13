import React, {memo, useEffect} from 'react';

import {browser} from 'webextension-polyfill-ts';
import './Home.scss';

import Screen from '../Screen';
import Header from './Header';
import Transactions from './Transactions';
import ActionsPane from './ActionsPane';
import {DASH_SERVICE_MESSAGES} from '../../Background/services/messages';

const Home = () => {
  useEffect(() => {
    const syncWallet = async (): Promise<void> => {
      await browser.runtime.sendMessage({
        type: DASH_SERVICE_MESSAGES.SYNC_WALLET,
      });
    };

    syncWallet().catch(console.error);
  }, []);

  return (
    <Screen className="home-screen">
      <Header />
      <ActionsPane />
      <Transactions />
    </Screen>
  );
};

export default memo(Home);
