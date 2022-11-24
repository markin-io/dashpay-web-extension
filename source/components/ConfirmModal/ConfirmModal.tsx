import React from 'react';
import {Button, Container} from 'semantic-ui-react';
import './ConfigmModal.scss';
import moneyFormatter from '../../utils/moneyFormatter';
import ModalHeader from '../ModalHeader';
import useDashQuotes from '../../hooks/useDashQuotes';

type Props = {
  amount: number;
  address: string;
  fee: number;
  onClose: () => void;
  onBroadcastTransaction: () => void;
  loading: boolean;
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
  loading,
}) => {
  const {duffsToDash, formatMoney} = moneyFormatter;
  const {dashUsdRate} = useDashQuotes();
  return (
    <Container className="confirm-modal column">
      <ModalHeader title="Confirm Transaction" onClose={onClose} />
      <div className="confirm-modal__head">
        <h3>{amount}</h3>
        <span className="confirm-modal__fiat">
          {formatMoney(+amount * dashUsdRate, 2)} $
        </span>
      </div>
      <div className="confirm-modal__content column">
        <div className="content__row">
          <div className="content__column">Sent to</div>
          <div className="content__column--end ">{formatAddress(address)}</div>
        </div>
        <div className="content__row">
          <div className="content__column">Network fee</div>
          <div className="content__column--end confirm-modal__amount">
            {formatMoney(duffsToDash(fee))}
          </div>
        </div>
        <div className="content__row">
          <div className="content__column">Total</div>
          <div className="content__column--end confirm-modal__amount">
            {amount + fee / 10 ** 8}
          </div>
        </div>
      </div>

      <div className={'confirm-modal__send'}>
        <Button
          fluid
          onClick={onBroadcastTransaction}
          disabled={loading}
          loading={loading}
        >
          {loading ? 'Loading' : 'Send'}
        </Button>
      </div>
    </Container>
  );
};

export default ConfirmModal;
