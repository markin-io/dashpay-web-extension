import * as React from 'react';
import {Button, Loader} from 'semantic-ui-react';

import './Splash.scss';
import {Link} from 'react-router-dom';
import Screen from '../Screen';

type Props = {
  newAccount: boolean;
};
const Splash: React.FC<Props> = ({newAccount}) => {
  return (
    <Screen className="splash-screen">
      {!newAccount && (
        <Loader className="splash-screen__loader" active inverted />
      )}
      {newAccount && (
        <div className="column splash-screen__content">
          <Button className="splash-screen__content__button">
            Create a New Wallet
          </Button>
          <Link to="/import" className="splash-screen__content__link">
            <span>Restore Wallet from Recovery Phrase</span>
          </Link>
        </div>
      )}
    </Screen>
  );
};

export default Splash;
