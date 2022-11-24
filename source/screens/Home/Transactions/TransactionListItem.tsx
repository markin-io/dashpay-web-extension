import React, {useMemo} from 'react';

import './TransactionListItem.scss';
import classnames from 'classnames';
import {TransactionHistoryItem} from '../../../Background/services/types';
import moneyFormatter from '../../../utils/moneyFormatter';

type Props = {
  transactionHistoryItem: TransactionHistoryItem;
  dashUsdRate: number;
};

const TransactionListItem: React.FC<Props> = (props) => {
  const {transactionHistoryItem, dashUsdRate} = props;
  const {duffsToDash, formatMoney} = moneyFormatter;

  const {satoshisBalanceImpact, feeImpact, blockHash} = transactionHistoryItem;
  const balanceImpactFormatted = useMemo(() => {
    const formattedImpact = formatMoney(
      duffsToDash(Math.abs(satoshisBalanceImpact - feeImpact))
    );

    if (satoshisBalanceImpact === 0) {
      return 0;
    }
    return satoshisBalanceImpact < 0
      ? `-${formattedImpact}`
      : `+${formattedImpact}`;
  }, [satoshisBalanceImpact, feeImpact]);

  const fiatImpact = useMemo(() => {
    return formatMoney(
      duffsToDash((satoshisBalanceImpact - feeImpact) * dashUsdRate),
      2
    );
  }, [dashUsdRate, satoshisBalanceImpact, feeImpact]);

  const {type, time} = transactionHistoryItem;
  const dateFormatted = Intl.DateTimeFormat('default', {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
  }).format(new Date(time));

  return (
    <li className="transaction-list-item">
      <div className="content__row">
        <div className="content__column row">
          <span>{type.slice(0, 1).toUpperCase() + type.slice(1)} </span>
          {!blockHash && (
            <p className="transaction-list-item__unconfirmed">Unconfirmed</p>
          )}
        </div>
        <div
          className={classnames(
            `content__column--end transaction-list-item__balance-impact transaction-list-item__balance-impact--${type}`
          )}
        >
          {balanceImpactFormatted}
        </div>
      </div>
      <div className="content__row">
        <div className="content__column transaction-list-item__secondary">
          {blockHash ? dateFormatted : ''}
        </div>
        <div className="content__column--end transaction-list-item__secondary">
          {fiatImpact === '0,00' ? ' < 0,01' : fiatImpact} $
        </div>
      </div>
    </li>
  );
};

export default TransactionListItem;
