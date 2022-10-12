import React from 'react';
import {Button, Container, Icon} from 'semantic-ui-react';
import './ConfigmModal.scss';

type Props = {
  amount: number;
  address: string;
  fee: string;
  onClose: () => void;
};
const ConfirmModal: React.FC<Props> = ({amount, onClose, address, fee}) => {
  return (
    <Container className="confirm-modal column">
      <div className="confirm-modal__header">
        <div> Confirm Transaction</div>
        <Button icon className="confirm-modal__button" onClick={onClose}>
          <Icon name="close" />
        </Button>
      </div>
      <h3>{amount}</h3>
      <div className="confirm-modal__content column">
        <div className="content__row">
          <div className="content__column">Sent to</div>
          <div className="content__column--end">{address}</div>
        </div>
        <div className="content__row">
          <div className="content__column">Network fee</div>
          <div className="content__column--end">{fee}</div>
        </div>
        <div className="content__row">
          <div className="content__column">Total</div>
          <div className="content__column--end">0</div>
        </div>
      </div>

      <div className={'confirm-modal__send'}>
        <Button fluid>Send</Button>
      </div>
    </Container>
  );
};

export default ConfirmModal;
