import React, {useMemo, useState} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import moneyFormatter from '../../../utils/moneyFormatter';
import useFiatConversionRate from '../../../hooks/useFiatConversionRate';

type Props = {
  balance: number;
};
const Balance: React.FC<Props> = ({balance}) => {
  const [showBalance, setShowBalance] = useState(true);
  const {formatDash, formatMoneyToString} = moneyFormatter;
  const {fiatRate} = useFiatConversionRate();

  const balanceFormatted = useMemo(() => {
    return formatMoneyToString(formatDash(balance), 2);
  }, [balance]);

  const fiatBalanceFormatted = useMemo((): string => {
    return formatMoneyToString(formatDash(balance) * fiatRate, 2);
  }, [balance, fiatRate]);

  return (
    <div className="send-form__balance">
      <span>
        Balance:{' '}
        {showBalance
          ? `${balanceFormatted} Dash ~ ${fiatBalanceFormatted} $`
          : '****'}
      </span>
      <Button icon onClick={(): void => setShowBalance((prev) => !prev)}>
        <Icon name="eye" />
      </Button>
    </div>
  );
};

export default Balance;
