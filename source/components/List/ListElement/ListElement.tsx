import React from 'react';
import './ListElement.scss';

type Props = {
  start?: string;
  end?: React.ReactNode;
  name?: string;
  action?: () => void;
};
const ListElement: React.FC<Props> = ({start, end, children, name, action}) => {
  return (
    <div className="list-element" onClick={action}>
      {start && (
        <div className="list-element__start">
          <img src={start} alt={name} />
        </div>
      )}
      <div className="list-element__content"> {children}</div>
      {end && <div className="list-element__end"> {end}</div>}
    </div>
  );
};

export default ListElement;
