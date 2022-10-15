import React, {useMemo} from 'react';

import './TransactionListItem.scss';
import classnames from 'classnames';
import {TransactionHistoryItem} from '../../../Background/services/types';
import moneyFormatter from '../../../utils/moneyFormatter';

type Props = {
  transactionHistoryItem: TransactionHistoryItem;
};

const isNegative = (value: string | number): boolean => {
  if (typeof value === 'string' && value?.length > 0) {
    return value[0] === '-';
  }
  return false;
};

const TransactionListItem: React.FC<Props> = (props) => {
  const {transactionHistoryItem} = props;

  const {satoshisBalanceImpact, feeImpact, blockHash} = transactionHistoryItem;
  const balanceImpactFormatted = useMemo(() => {
    const formattedImpact = moneyFormatter.formatDuffs(
      Math.abs(satoshisBalanceImpact + feeImpact)
    );

    if (satoshisBalanceImpact === 0) {
      return 0;
    }
    return satoshisBalanceImpact < 0
      ? `-${formattedImpact}`
      : `+${formattedImpact}`;
  }, [satoshisBalanceImpact]);

  const {type, time} = transactionHistoryItem;
  const dateFormatted = Intl.DateTimeFormat('default', {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
  }).format(new Date(time));

  return (
    <li className="transaction-list-item">
      <div className="row">
        <span>{type.slice(0, 1).toUpperCase() + type.slice(1)} </span>

        {!blockHash && (
          <p className="transaction-list-item-unconfirmed">Unconfirmed</p>
        )}
      </div>
      <span
        className={classnames('transaction-list-item__balance-impact', {
          'transaction-list-item__balance-impact--negative': isNegative(
            balanceImpactFormatted
          ),
        })}
      >
        {balanceImpactFormatted}
      </span>
      {!!blockHash && (
        <span className="transaction-list-item__date">{dateFormatted}</span>
      )}
    </li>
  );
};

export default TransactionListItem;
