import React, {useEffect, useState} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {browser} from 'webextension-polyfill-ts';
import classnames from 'classnames';
import ModalHeader from '../ModalHeader';
import DASH_SERVICE_MESSAGES from '../../Background/services/messages';
import './ReceiveModal.scss';

type Props = {
  onClose: () => void;
};

const ReceiveModal: React.FC<Props> = ({onClose}) => {
  const [currentAddress, setAddress] = useState('');
  const [error, setError] = useState(false);

  const fetchAddress = async (): Promise<void> => {
    const result = await browser.runtime.sendMessage({
      type: DASH_SERVICE_MESSAGES.GET_UNUSED_ADDRESS,
    });
    if (result?.address) {
      setAddress(result?.address);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <div className="column receive-modal">
      <ModalHeader title="Receive" onClose={onClose} />

      <div
        className={classnames('receive-modal__content', {
          'receive-modal__content--error': error,
        })}
      >
        {error ? (
          <>
            <span className="receive-modal__content-item--error">
              Something went wrong
            </span>
            <Button
              icon
              className="receive-modal__content-button"
              onClick={(): Promise<void> => fetchAddress()}
            >
              <Icon name="redo" />
            </Button>
          </>
        ) : (
          <>
            <span className="receive-modal__content-item">
              {currentAddress}
            </span>
            <Button
              icon
              className="receive-modal__content-button"
              onClick={(): Promise<void> =>
                navigator.clipboard.writeText(currentAddress)
              }
            >
              <Icon name="copy outline" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReceiveModal;
