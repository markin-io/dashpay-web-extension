import React, {useMemo} from 'react';

import './Header.scss';
import logo from '../../../assets/images/logo.png';
import useWalletBalance from '../../../hooks/useWalletBalance';
import useWalletSyncProgress from '../../../hooks/useWalletSyncProgress';
import moneyFormatter from '../../../utils/moneyFormatter';
import useDashQuotes from '../../../hooks/useDashQuotes';

const Header = () => {
  const {balance} = useWalletBalance();
  const {dashUsdRate} = useDashQuotes();
  const {initialized} = useWalletSyncProgress();
  const {formatMoney, duffsToDash} = moneyFormatter;

  const balanceFormatted = useMemo(() => {
    return formatMoney(duffsToDash(balance));
  }, [balance]);

  const fiatBalanceFormatted = useMemo((): string => {
    return formatMoney(duffsToDash(balance) * dashUsdRate, 2);
  }, [balance, dashUsdRate]);

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
