import * as React from 'react';
import {Loader} from 'semantic-ui-react';

import './Splash.scss';
import Screen from '../Screen';

const Splash: React.FC = () => {
  return (
    <Screen className="splash-screen">
      <Loader className="splash-screen__loader" active inverted />
    </Screen>
  );
};

export default Splash;
