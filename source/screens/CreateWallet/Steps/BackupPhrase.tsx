import React from 'react';
import ShowPhrase from '../../../components/ShowPhrase/ShowPhrase';
import {IconBack} from '../../../components/NavigateBack/IconBack';
import Button from '../../../components/Buttons';

type Props = {
  onBackStep: () => void;
  onNextStep: () => void;
};
const BackupPhrase: React.FC<Props> = ({onBackStep, onNextStep}) => {
  return (
    <div className="step column">
      <div className="step__nav">
        {onBackStep && (
          <button onClick={onBackStep} type="button">
            <IconBack fill="#191C1F" />
          </button>
        )}
      </div>
      <div className="step__content">
        <ShowPhrase />
      </div>

      {onNextStep && (
        <div className="column step__buttons">
          <Button onClick={onNextStep}>Verify</Button>
        </div>
      )}
    </div>
  );
};

export default BackupPhrase;
