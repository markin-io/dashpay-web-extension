import React, {useEffect, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import './ShowPhrase.scss';
import WarningIcon from '../Icons/WarningIcon';

const ShowPhrase: React.FC = () => {
  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    const getMenmonic = async (): Promise<void> => {
      const result = await browser.storage.local.get('mnemonic');
      setMnemonic(result.mnemonic);
    };
    getMenmonic().catch(console.error);
  }, []);

  return (
    <div className="phrase">
      <div className="phrase__content">
        <div className="fadeIn">
          {mnemonic.split(' ').map((word) => (
            <span key={word}>{word}&nbsp;</span>
          ))}
        </div>
      </div>

      <div className="phrase__warning">
        <WarningIcon />
        <span className="phrase__warning__text">
          Do NOT let anyone to see your recovery phrase.
        </span>
      </div>
    </div>
  );
};

export default ShowPhrase;
