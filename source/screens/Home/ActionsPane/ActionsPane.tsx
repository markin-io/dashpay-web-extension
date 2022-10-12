import React from 'react';
import {useNavigate} from 'react-router-dom';

import './ActionsPane.scss';

const ActionsPane: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigateToSend = (): void => {
    navigate('/send');
  };

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
        onClick={handleNavigateToSend}
      >
        Send to Address
      </button>
    </div>
  );
};

export default ActionsPane;
