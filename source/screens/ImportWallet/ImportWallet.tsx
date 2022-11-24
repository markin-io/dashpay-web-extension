import React from 'react';
import NavigateBack from '../../components/NavigateBack';
import './ImportWallet.scss';
import {Button} from 'semantic-ui-react';
import {Mnemonic} from '@dashevo/dashcore-lib';

const ImportWallet: React.FC = () => {
  const code =
    'select scout crash enforce riot rival spring whale hollow radar rule sentence';
  const valid = Mnemonic.isValid(code);
  console.log(valid);
  return (
    <div className="import-wallet column">
      <NavigateBack title="" />
      <h3 className="import-wallet__header">
        Restore wallet from the recovery phrase
      </h3>

      <div className="import-wallet__input">
        <label className="import-wallet__label prefix">Recovery phrase </label>
        <textarea name="Text1" rows={3} />
      </div>
      <span className="import-wallet__label suffix">
        Separate words with spaces
      </span>

      <div className="import-wallet__button">
        <Button fluid>Continue</Button>
      </div>
    </div>
  );
};

export default ImportWallet;
