import './Button.scss';
import React from 'react';
import classnames from 'classnames';

type Props = {
  onClick: () => void;
  link?: boolean;
};
const Button: React.FC<Props> = ({children, onClick, link = false}) => {
  return (
    <button
      className={classnames('c-button', {'c-button--link': link})}
      type="button"
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
