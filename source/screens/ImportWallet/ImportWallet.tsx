import React, {useState} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Mnemonic} from '@dashevo/dashcore-lib';
import classnames from 'classnames';

import './ImportWallet.scss';
import {Button} from 'semantic-ui-react';
import {useNavigate} from 'react-router-dom';
import {browser} from 'webextension-polyfill-ts';
import {IconBack} from '../../components/NavigateBack/IconBack';

const ImportWallet: React.FC = () => {
  const navigate = useNavigate();
  const [mnemonic, setMnemonic] = useState('');
  const [error, setError] = useState(false);

  const handleCheckMnemonic = (value: string): void => {
    const valid = Mnemonic.isValid(value);
    if (valid) {
      setError(false);
      browser.storage.local.set({mnemonic: value});
      navigate('/popup.html');
    } else {
      setError(true);
    }
  };

  return (
    <div className="import-wallet column">
      <div className="import-wallet__nav">
        <button onClick={(): void => navigate(-1)} type="button">
          <IconBack fill="#191C1F" />
        </button>
      </div>
      <h3 className="import-wallet__header">
        Restore wallet from the recovery phrase
      </h3>

      <div
        className={classnames('import-wallet__input', {
          'import-wallet__input--error': error,
        })}
      >
        <label className="import-wallet__label prefix">Recovery phrase </label>
        <textarea
          name="Text1"
          rows={3}
          value={mnemonic}
          className={classnames(null, {error})}
          onChange={(e): void => {
            setMnemonic(e.target.value);
            setError(false);
          }}
        />
      </div>
      <span
        className={classnames('import-wallet__label suffix', {
          'import-wallet__label--error': error,
        })}
      >
        {error && mnemonic.length > 1
          ? 'It is not a recovery phrase'
          : 'Separate words with spaces'}
      </span>

      <div className="import-wallet__button">
        <Button
          fluid
          onClick={(): void => handleCheckMnemonic(mnemonic)}
          disabled={mnemonic.length < 1}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ImportWallet;
