import React, {useEffect, useState, memo} from 'react';
import {browser} from 'webextension-polyfill-ts';
import './ShowPhrase.scss';
import {WarningIcon} from '../../assets/icons';
import Icon from '../Icon';

const ShowPhrase: React.FC = () => {
  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    const getMnemonic = async (): Promise<void> => {
      const result = await browser.storage.local.get('mnemonic');
      setMnemonic(result.mnemonic);
    };
    getMnemonic().catch(console.error);
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
        <Icon icon={WarningIcon} name="WarningIcon" />
        <span className="phrase__warning__text">
          Do NOT let anyone to see your recovery phrase.
        </span>
      </div>
    </div>
  );
};

export default memo(ShowPhrase);
