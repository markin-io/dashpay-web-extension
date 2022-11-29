import React from 'react';
import Button from '../../../components/Buttons';
import LockIcon from '../../../components/Icons/LockIcon';

type Props = {
  onBackStep: () => void;
  onNextStep: () => void;
};
const SecureNow: React.FC<Props> = ({onNextStep}) => {
  return (
    <div className="step column">
      <div className="step__nav step__nav--skip">
        <button type="button">Skip</button>
      </div>
      <div className="step__content">
        <div>
          <LockIcon />
        </div>
        <h5 className="step__header">Secure your wallet</h5>
        <span className="step__text">
          If you lose this device, you will lose your funds. Backup your wallet
          with a recovery phrase so you can restore your wallet on another
          device.
        </span>
      </div>

      <div className="column step__buttons">
        <Button onClick={onNextStep}> Backup Wallet</Button>
      </div>
    </div>
  );
};

export default SecureNow;