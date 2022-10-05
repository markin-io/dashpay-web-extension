import React from 'react';
import classnames from 'classnames';

import './Transactions.scss';
import useWalletSyncProgress from '../../../hooks/useWalletSyncProgress';
import useTransactionHistory from '../../../hooks/useTransactionHistory';
import TransactionListItem from './TransactionListItem';

const Transactions = () => {
  const {txSyncProgressInfo, headersSyncProgressInfo} = useWalletSyncProgress();

  const {transactionHistory} = useTransactionHistory();

  return (
    <div className="transactions">
      <section className="transactions__boundaries">
        <div className="transactions__header">
          <h1 className="transactions__history-title">History</h1>
          <div className="transactions__progress">
            <p className="transactions__progress-label">
              Syncing{' '}
              {headersSyncProgressInfo.totalProgress !== 100
                ? 'headers'
                : 'transactions'}
            </p>
            <p className="transactions__progress-value">
              {headersSyncProgressInfo.totalProgress !== 100
                ? headersSyncProgressInfo.totalProgress
                : txSyncProgressInfo.progress}
              %
            </p>
          </div>
        </div>
        <div
          className={classnames('transactions__list', {
            'transactions__list--empty': transactionHistory.length === 0,
          })}
        >
          {transactionHistory.length === 0 ? (
            <p className="transactions__empty-label">
              There are no transactions to display
            </p>
          ) : (
            <ul>
              {transactionHistory
                .filter(({type}) => type === 'received' || type === 'sent')
                .map((transactionHistoryItem) => {
                  return (
                    <TransactionListItem
                      transactionHistoryItem={transactionHistoryItem}
                      key={transactionHistoryItem.txId}
                    />
                  );
                })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Transactions;
