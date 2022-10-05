import * as React from 'react';
import classnames from 'classnames';

import './Screen.scss';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const Screen = ({className, children}: Props) => {
  return (
    <section className={classnames('screen', className)}>{children}</section>
  );
};

export default Screen;
