import React from 'react';
import Screen from '../Screen';
import NavigateBack from '../../components/NavigateBack';
import './Send.scss';
import SendForm from './SendForm';

const Send: React.FC = () => {
  return (
    <Screen className="send-screen column">
      <header>
        <NavigateBack title={'Send to Address'} />
      </header>
      <section className="send-screen__content column">
        <SendForm />
      </section>
    </Screen>
  );
};

export default Send;
