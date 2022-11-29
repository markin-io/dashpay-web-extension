import * as React from 'react';
import {Loader} from 'semantic-ui-react';

import './Splash.scss';
import {Link, useNavigate} from 'react-router-dom';
import Screen from '../Screen';
import Button from '../../components/Buttons';

type Props = {
  newAccount: boolean;
  onCreate: () => void;
};
const Splash: React.FC<Props> = ({newAccount, onCreate}) => {
  const navigate = useNavigate();
  const handleCreateMnemonic = () => {
    onCreate();
    navigate('/create');
  };
  return (
    <Screen className="splash-screen">
      {!newAccount && (
        <Loader className="splash-screen__loader" active inverted />
      )}
      {newAccount && (
        <div className="column splash-screen__content">
          <Button onClick={handleCreateMnemonic}> Create a New Wallet</Button>
          <Link to="/import" className="splash-screen__content__link">
            <span>Restore Wallet from Recovery Phrase</span>
          </Link>
        </div>
      )}
    </Screen>
  );
};

export default Splash;
