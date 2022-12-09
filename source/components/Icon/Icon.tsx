import React from 'react';
import './Icon.scss';

type Props = {
  icon: string;
  name: string;
};
const Icon: React.FC<Props> = ({icon, name, ...props}) => {
  return (
    <div {...props} className="svg-icon">
      <img src={icon} alt={name} />
    </div>
  );
};

export default Icon;
