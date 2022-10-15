import React, {useMemo, useState} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import moneyFormatter from '../../../utils/moneyFormatter';

type Props = {
  balance: number;
};
const Balance: React.FC<Props> = ({balance}) => {
  const [showBalance, setShowBalance] = useState(true);

  const balanceFormatted = useMemo(() => {
    return moneyFormatter.formatDuffs(balance);
  }, [balance]);

  return (
    <div className="send-form__balance">
      <span>Balance: {showBalance ? `${balanceFormatted} Dash` : '****'}</span>
      <Button icon onClick={(): void => setShowBalance((prev) => !prev)}>
        <Icon name="eye" />
      </Button>
    </div>
  );
};

export default Balance;
