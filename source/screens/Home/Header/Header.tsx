import React, {useMemo} from 'react';

import './Header.scss';
import logo from '../../../assets/images/logo.png';
import useWalletBalance from '../../../hooks/useWalletBalance';
import useWalletSyncProgress from '../../../hooks/useWalletSyncProgress';
import moneyFormatter from '../../../utils/moneyFormatter';
import useFiatConversionRate from '../../../hooks/useFiatConversionRate';

const Header = () => {
  const {balance} = useWalletBalance();
  const {fiatRate} = useFiatConversionRate();
  const {initialized} = useWalletSyncProgress();
  const {formatMoneyToString, formatDash} = moneyFormatter;

  const balanceFormatted = useMemo(() => {
    return formatMoneyToString(formatDash(balance));
  }, [balance]);

  const fiatBalanceFormatted = useMemo((): string => {
    return formatMoneyToString(formatDash(balance) * fiatRate, 2);
  }, [balance, fiatRate]);

  return (
    <header className="header">
      <img
        className="header__logo"
        alt="Logo"
        src={logo}
        width={90}
        height={24}
      />
      <section className="header__balance">
        <span className="header__balance__syncing">
          {initialized ? '' : 'Syncing Balance (testnet)'}
        </span>
        <span className="header__balance__value-dash">{balanceFormatted}</span>
        {!!fiatBalanceFormatted && (
          <span className="header__balance__value-fiat">
            {`${fiatBalanceFormatted} $`}
          </span>
        )}
      </section>
    </header>
  );
};

export default Header;
