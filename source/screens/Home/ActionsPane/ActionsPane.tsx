import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './ActionsPane.scss';
import {Modal} from 'semantic-ui-react';
import ReceiveModal from '../../../components/ReceiveModal';

const ActionsPane: React.FC = () => {
  const [showReceive, setShowReceive] = useState(false);
  const navigate = useNavigate();
  const handleNavigateToSend = (): void => {
    navigate('/send');
  };

  return (
    <div className="actions-pane">
      <Modal
        onClose={(): void => setShowReceive(false)}
        onOpen={(): void => setShowReceive(true)}
        open={showReceive}
        className="modal"
        trigger={
          <button
            type="button"
            className="actions-pane__button actions-pane__button--receive"
          >
            Receive
          </button>
        }
      >
        <ReceiveModal onClose={(): void => setShowReceive(false)} />
      </Modal>

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
