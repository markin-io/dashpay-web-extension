import React from 'react';
import './Icon.scss';

type Props = {
  icon: string;
};
const Icon: React.FC<Props> = ({icon, ...props}) => {
  return (
    <div {...props} className="svg-icon">
      <img src={icon} alt="icon" />
    </div>
  );
};

export default Icon;
