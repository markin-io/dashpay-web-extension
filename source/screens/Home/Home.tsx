import React, {useEffect} from 'react';

import {browser} from 'webextension-polyfill-ts';
import './Home.scss';

import Screen from '../Screen';
import Header from './Header';
import MESSAGES from '../../Background/messages';
import Transactions from './Transactions';

const Home = () => {
  useEffect(() => {
    const syncWallet = async (): Promise<void> => {
      await browser.runtime.sendMessage({type: MESSAGES.SYNC_WALLET});
    };

    syncWallet().catch(console.error);
  }, []);

  return (
    <Screen className="home-screen">
      <Header />
      <Transactions />
    </Screen>
  );
};

export default Home;
