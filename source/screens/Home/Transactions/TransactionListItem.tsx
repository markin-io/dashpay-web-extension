import React, {useMemo} from 'react';

import './TransactionListItem.scss';
import classnames from 'classnames';
import {TransactionHistoryItem} from '../../../Background/services/types';
import moneyFormatter from '../../../utils/moneyFormatter';

type Props = {
  transactionHistoryItem: TransactionHistoryItem;
};

const TransactionListItem: React.FC<Props> = (props) => {
  const {transactionHistoryItem} = props;

  const {satoshisBalanceImpact, feeImpact, blockHash} = transactionHistoryItem;
  const balanceImpactFormatted = useMemo(() => {
    const formattedImpact = moneyFormatter.formatDuffs(
      Math.abs(satoshisBalanceImpact - feeImpact)
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
    <li
      className={classnames('transaction-list-item', {
        'transaction-list-item--unconfirmed': !blockHash,
      })}
    >
      <div className="row">
        <span>{type.slice(0, 1).toUpperCase() + type.slice(1)} </span>
        {!blockHash && (
          <p className="transaction-list-item__unconfirmed">Unconfirmed</p>
        )}
      </div>
      <span
        className={classnames(
          `transaction-list-item__balance-impact transaction-list-item__balance-impact--${type}`
        )}
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
