import React from 'react';

import './ActionsPane.scss';

const ActionsPane = () => {
  return (
    <div className="actions-pane">
      <button
        type="button"
        className="actions-pane__button actions-pane__button--receive"
      >
        Receive
      </button>
      <button
        type="button"
        className="actions-pane__button actions-pane__button--send"
      >
        Send to Address
      </button>
    </div>
  );
};

export default ActionsPane;
