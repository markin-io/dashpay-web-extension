import React from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import ListElement from '../../components/List/ListElement/ListElement';

import SecurityIcon from '../../assets/images/More/menu_security.png';
import SupportIcon from '../../assets/images/More/menu_support.png';
import ToolsIcon from '../../assets/images/More/menu_tools.png';
import SettingsIcon from '../../assets/images/More/levels.png';
import ListContainer from '../../components/List/ListContainer';
import NavWrapper from '../../components/Nav/NavWrapper';

const items = [
  {
    name: 'security',
    content: (
      <div className="column list__element">
        <span className="list__element__title">Security</span>
        <span className="list__element__subtitle">
          View passphrase, backup wallet
        </span>
      </div>
    ),
    icon: SecurityIcon,
    end: null,
    action: (navigate: NavigateFunction): void => navigate('security'),
  },
  {
    name: 'settings',
    content: (
      <div className="column list__element">
        <span className="list__element__title">Settings</span>
        <span className="list__element__subtitle">
          default currency, shortcuts, about
        </span>
      </div>
    ),
    icon: SettingsIcon,
    end: null,
    action: (): void => undefined,
  },
  {
    name: 'tools',
    content: (
      <div className="column list__element">
        <span className="list__element__title">Tools</span>
        <span className="list__element__subtitle">
          Import private key, Export CSV
        </span>
      </div>
    ),
    icon: ToolsIcon,
    end: null,
    action: (): void => undefined,
  },
  {
    name: 'support',
    content: (
      <div className="column list__element">
        <span className="list__element__title">Support</span>
        <span className="list__element__subtitle">Support an issue</span>
      </div>
    ),
    icon: SupportIcon,
    end: null,
    action: (): void => undefined,
  },
];

const More: React.FC = () => {
  const navigate = useNavigate();
  return (
    <NavWrapper title={'More'}>
      <ListContainer>
        {items.map((item) => (
          <ListElement
            key={item.name}
            start={item.icon}
            name={item.name}
            action={() => item.action(navigate)}
          >
            {item.content}
          </ListElement>
        ))}
      </ListContainer>
    </NavWrapper>
  );
};

export default More;
