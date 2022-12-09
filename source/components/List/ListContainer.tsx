import React from 'react';
import './ListContainer.scss';

const ListContainer: React.FC = ({children}) => {
  return <div className="list list__content"> {children} </div>;
};
export default ListContainer;
