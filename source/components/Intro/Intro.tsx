import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../Buttons';
import Screen from '../../screens/Screen';
import './Intro.scss';

type Props = {
  onCreateMnemonic: () => void;
};
const Intro: React.FC<Props> = ({onCreateMnemonic}) => {
  return (
    <Screen className="intro-screen">
      <div className="column intro-screen__content">
        <Button onClick={onCreateMnemonic}> Create a New Wallet</Button>
        <Link to="/import" className="intro-screen__content__link">
          <span>Restore Wallet from Recovery Phrase</span>
        </Link>
      </div>
    </Screen>
  );
};

export default Intro;
