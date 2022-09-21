import React, {useState} from 'react';
import classnames from 'classnames';

import './Transactions.scss';

const Transactions = () => {
  const [transactions] = useState([]);

  return (
    <div className="transactions">
      <section className="transactions__boundaries">
        <div className="transactions__header">
          <h1 className="transactions__history-title">History</h1>
          <div className="transactions__progress">
            <p className="transactions__progress-label">Syncing</p>
            <p className="transactions__progress-value">50%</p>
          </div>
        </div>
        <div
          className={classnames('transactions__list', {
            'transactions__list--empty': transactions.length === 0,
          })}
        >
          {transactions.length === 0 ? (
            <p className="transactions__empty-label">
              There are no transactions to display
            </p>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  );
};

export default Transactions;
