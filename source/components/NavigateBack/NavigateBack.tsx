import React from 'react';

import './NavigateBack.scss';
import {Button} from 'semantic-ui-react';
import {useNavigate} from 'react-router-dom';
import {IconBack} from './IconBack';

type Props = {
  title: string;
};
const NavigateBack: React.FC<Props> = ({title}) => {
  const navigate = useNavigate();
  return (
    <section className="navigate">
      <Button
        icon
        onClick={(): void => navigate(-1)}
        className="navigate__button"
      >
        <IconBack />
      </Button>
      <span className="navigate__title">{title}</span>
    </section>
  );
};

export default NavigateBack;
