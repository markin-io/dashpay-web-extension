import React, {useMemo} from 'react';

import './Header.scss';
import logo from '../../../assets/images/logo.png';
import useWalletBalance from '../../../hooks/useWalletBalance';
import useWalletSyncProgress from '../../../hooks/useWalletSyncProgress';

const Header = () => {
  const {balance} = useWalletBalance();
  const {initialized} = useWalletSyncProgress();

  const balanceFormatted = useMemo(() => {
    const balanceDash = balance / 1e8;
    return balanceDash.toString().replace('.', ',');
  }, [balance]);

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
        <span className="header__balance-syncing">
          {initialized ? '' : 'Syncing Balance'}
        </span>
        <span className="header__balance-value-dash">{balanceFormatted}</span>
      </section>
    </header>
  );
};

export default Header;
