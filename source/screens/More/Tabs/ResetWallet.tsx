import React, {useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {Button, Modal} from 'semantic-ui-react';
import classnames from 'classnames';
import NavWrapper from '../../../components/Nav/NavWrapper';

import './Styles.scss';

const ResetWallet: React.FC = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCheckMnemonic = async (value: string): Promise<void> => {
    const currentMnemonic = await browser.storage.local.get('mnemonic');
    if (currentMnemonic.mnemonic === value) {
      setShowModal(true);
    } else {
      setError(true);
    }
  };

  const handleRemoveWallet = (): void => {
    // TODO: rework this hack once dash wallet lifecycle bugs are fixed
    browser.storage.local.clear().then(() => {
      indexedDB.deleteDatabase('localforage');
      browser.runtime.reload();
    });
  };

  return (
    <NavWrapper title={'Wipe Wallet'}>
      <div className="column reset-wallet">
        <h5>Enter Recovery Phrase</h5>
        <div className="reset-wallet__input">
          <textarea
            name="Text1"
            rows={3}
            cols={4}
            value={mnemonic}
            className={classnames(null, {error})}
            onChange={(e): void => {
              setMnemonic(e.target.value);
              setError(false);
            }}
          />
        </div>
        <span
          className={classnames('reset-wallet__label suffix', {
            'reset-wallet__label--error': error,
          })}
        >
          {error && mnemonic.length > 1
            ? 'It is not a recovery phrase'
            : 'Separate words with spaces'}
        </span>

        <div className="reset-wallet__button">
          <Button
            fluid
            onClick={(): Promise<void> => handleCheckMnemonic(mnemonic)}
            disabled={mnemonic.length < 1}
          >
            Continue
          </Button>
          <Modal
            onClose={(): void => setShowModal(false)}
            onOpen={(): void => setShowModal(true)}
            open={showModal}
            className="modal"
          >
            <div className="column reset-wallet__modal">
              <span className="reset-wallet__modal__tile">
                Are you sure you want to reset the wallet?
              </span>
              <span className="reset-wallet__modal__subtitle">
                If you reset the wallet the only way to get access to it is to
                recover the wallet with the recovery phrase.
              </span>
              <Button
                className="reset-wallet__modal__button"
                onClick={handleRemoveWallet}
              >
                Yes, Reset Wallet
              </Button>
              <Button
                basic
                color="blue"
                className="reset-wallet__modal__button"
                onClick={(): void => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </NavWrapper>
  );
};

export default ResetWallet;
