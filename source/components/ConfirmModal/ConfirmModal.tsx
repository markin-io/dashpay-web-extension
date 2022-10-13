import React from 'react';
import {Button, Container, Icon} from 'semantic-ui-react';
import './ConfigmModal.scss';
import moneyFormatter from '../../utils/moneyFormatter';

type Props = {
  amount: number;
  address: string;
  fee: number;
  onClose: () => void;
  onBroadcastTransaction: () => void;
};

const formatAddress = (address: string): string => {
  if (address.length > 20) {
    return address.replace(address.slice(5, address.length - 5), '...');
  }
  return address;
};

const ConfirmModal: React.FC<Props> = ({
  amount,
  onClose,
  address,
  fee,
  onBroadcastTransaction,
}) => {
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
          <div className="content__column--end">{formatAddress(address)}</div>
        </div>
        <div className="content__row">
          <div className="content__column">Network fee</div>
          <div className="content__column--end">
            {moneyFormatter.formatDuffs(fee)}
          </div>
        </div>
        <div className="content__row">
          <div className="content__column">Total</div>
          <div className="content__column--end">{amount - fee / 10 ** 8}</div>
        </div>
      </div>

      <div className={'confirm-modal__send'}>
        <Button fluid onClick={onBroadcastTransaction}>
          Send
        </Button>
      </div>
    </Container>
  );
};

export default ConfirmModal;
