import React, {ReactNode, useState} from 'react';
import Screen from '../Screen';
import SecureNow from './Steps/SecureNow';
import BackupWallet from './Steps/BackupWallet';
import './Steps/styles.scss';
import BackupPhrase from './Steps/BackupPhrase';
import Verify from './Steps/Verify';

type StepComponentProps = {
  onBackStep: () => void;
  onNextStep: () => void;
};
const steps = [
  {
    key: 'secure-now',
    component: (props: StepComponentProps): ReactNode => (
      <SecureNow {...props} />
    ),
  },
  {
    key: 'backup-wallet',
    component: (props: StepComponentProps): ReactNode => (
      <BackupWallet {...props} />
    ),
  },
  {
    key: 'backup-phrase',
    component: (props: StepComponentProps): ReactNode => (
      <BackupPhrase {...props} />
    ),
  },
  {
    key: 'verify',
    component: (props: StepComponentProps): ReactNode => <Verify {...props} />,
  },
];
const CreateWallet: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const onBackStep = (): void => {
    setActiveStep((prevState) => prevState - 1);
  };
  const onNextStep = (): void => {
    setActiveStep((prevState) => prevState + 1);
  };
  return (
    <Screen>
      {steps[activeStep].component({
        onBackStep,
        onNextStep,
      })}
    </Screen>
  );
};

export default CreateWallet;
