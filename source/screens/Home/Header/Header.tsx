import React from 'react';

import './Header.scss';
import logo from '../../../assets/images/logo.png';

const Header = () => {
  return (
    <header className="header">
      <img
        className="header__logo"
        alt="Logo"
        src={logo}
        width={90}
        height={24}
      />
    </header>
  );
};

export default Header;
