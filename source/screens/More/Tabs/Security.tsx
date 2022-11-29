import React from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import ListElement from '../../../components/List/ListElement/ListElement';
import ListContainer from '../../../components/List/ListContainer';
import NavWrapper from '../../../components/Nav/NavWrapper';

const items = [
  {
    name: 'recovery-phrase',
    content: (
      <div className="column list__element">
        <span className="list__element__title">View Recovery Phrase</span>
      </div>
    ),
    icon: undefined,
    end: null,
    action: (navigate: NavigateFunction): void => navigate('phrase'),
  },
  {
    name: 'reset-wallet',
    content: (
      <div className="column list__element">
        <span className="list__element__title">Reset Wallet</span>
      </div>
    ),
    icon: undefined,
    end: null,
    action: (navigate: NavigateFunction): void => navigate('reset-wallet'),
  },
];
const Security: React.FC = () => {
  const navigate = useNavigate();
  return (
    <NavWrapper title={'Security'}>
      <ListContainer>
        {items.map((item) => (
          <ListElement
            key={item.name}
            start={item.icon}
            name={item.name}
            action={(): void => item.action(navigate)}
          >
            {item.content}
          </ListElement>
        ))}
      </ListContainer>
    </NavWrapper>
  );
};

export default Security;
