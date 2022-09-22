import React, {useMemo} from 'react';

import './TransactionListItem.scss';
import {TransactionHistoryItem} from '../../../Background/services/types';
import moneyFormatter from '../../../utils/moneyFormatter';

type Props = {
  transactionHistoryItem: TransactionHistoryItem;
};

const TransactionListItem = (props: Props) => {
  const {transactionHistoryItem} = props;

  const {satoshisBalanceImpact, feeImpact} = transactionHistoryItem;
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
      <span>{type.slice(0, 1).toUpperCase() + type.slice(1)}</span>
      <span className="transaction-list-item__balance-impact">
        {balanceImpactFormatted}
      </span>
      <span className="transaction-list-item__date">{dateFormatted}</span>
    </li>
  );
};

export default TransactionListItem;
