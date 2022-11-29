import React from 'react';
import NavigateBack from '../NavigateBack';
import './NavWrapper.scss';

type Props = {
  title: string;
};
const NavWrapper: React.FC<Props> = ({title, children}) => {
  return (
    <div className="column wrapper">
      <NavigateBack title={title} />
      {children}
    </div>
  );
};
export default NavWrapper;
