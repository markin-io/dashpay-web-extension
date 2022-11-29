import React from 'react';
import Button from '../../../components/Buttons';
import CloudIcon from '../../../components/Icons/CloudIcon';
import SadIcon from '../../../components/Icons/SadIcon';
import BackupIcon from '../../../components/Icons/BackupIcon';
import {IconBack} from '../../../components/NavigateBack/IconBack';

type Props = {
  onBackStep?: () => void;
  onNextStep?: () => void;
};
const BackupWallet: React.FC<Props> = ({onNextStep, onBackStep}) => {
  return (
    <div className="step column">
      <div className="step__nav">
        {onBackStep && (
          <button onClick={onBackStep}>
            <IconBack fill="#191C1F" />
          </button>
        )}
      </div>
      <div className="step__content">
        <div>
          <BackupIcon />
        </div>
        <h5 className="step__header">
          Backup your wallet with a recovery phrase
        </h5>
        <span className="step__text">
          You will need this recovery phrase to access your funds if this device
          is lost, damaged or if Dash Wallet accidentally uninstalled from this
          device.
        </span>

        <div className="step__warning column">
          <div className="row center">
            <div>
              <CloudIcon />
            </div>
            <span className="step__warning__title">
              We do NOT store this recovery phrase
            </span>
          </div>
          <div className="row">
            <div>
              <SadIcon />
            </div>
            <div className="column">
              <span className="step__warning__title">
                You will NOT be able to restore the wallet without a recovery
                phrase
              </span>
              <span className="step__warning__subtitle">
                Write it in a safe place and don’t show it to anyone.
              </span>
            </div>
          </div>
        </div>
      </div>

      {onNextStep && (
        <div className="column step__buttons">
          <Button onClick={onNextStep}> Show Recovery Phrase</Button>
        </div>
      )}
    </div>
  );
};

export default BackupWallet;
