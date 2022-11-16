import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import './ModalHeader.scss';

type Props = {
  title: string;
  onClose: () => void;
};
const ModalHeader: React.FC<Props> = ({title, onClose}) => {
  return (
    <div className="modal__header">
      <div>{title}</div>
      <Button icon className="modal__button" onClick={onClose}>
        <Icon name="close" />
      </Button>
    </div>
  );
};

export default ModalHeader;
