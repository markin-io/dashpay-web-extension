import * as React from 'react';
// import {browser, Tabs} from 'webextension-polyfill-ts';

import './styles.scss';
import {useEffect, useState} from 'react';
import Splash from '../screens/Splash';
import Home from '../screens/Home';

// function openWebPage(url: string): Promise<Tabs.Tab> {
//   return browser.tabs.create({url});
// }

const Popup: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [loading]);

  return loading ? <Splash /> : <Home />;
};

export default Popup;
