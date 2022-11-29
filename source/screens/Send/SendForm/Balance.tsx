import React, {useMemo, useState} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import moneyFormatter from '../../../utils/moneyFormatter';
import useDashQuotes from '../../../hooks/useDashQuotes';

type Props = {
  balance: number;
};
const Balance: React.FC<Props> = ({balance}) => {
  const [showBalance, setShowBalance] = useState(true);
  const {duffsToDash, formatMoney} = moneyFormatter;
  const {dashUsdRate} = useDashQuotes();

  const balanceFormatted = useMemo(() => {
    return formatMoney(duffsToDash(balance), 2);
  }, [balance]);

  const fiatBalanceFormatted = useMemo((): string => {
    return formatMoney(duffsToDash(balance) * dashUsdRate, 2);
  }, [balance, dashUsdRate]);

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
