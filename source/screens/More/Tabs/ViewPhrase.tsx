import React from 'react';
import NavWrapper from '../../../components/Nav/NavWrapper';
import ShowPhrase from '../../../components/ShowPhrase/ShowPhrase';

const ViewPhrase: React.FC = () => {
  return (
    <NavWrapper title={'Recovery Phrase'}>
      <ShowPhrase />
    </NavWrapper>
  );
};

export default ViewPhrase;
