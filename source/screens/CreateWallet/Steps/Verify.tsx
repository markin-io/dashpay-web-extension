import React, {useEffect, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {Button} from 'semantic-ui-react';
import {useNavigate} from 'react-router-dom';
import {IconBack} from '../../../components/NavigateBack/IconBack';

type Props = {
  onBackStep: () => void;
  onNextStep?: () => void;
};
const Verify: React.FC<Props> = ({onBackStep}) => {
  const [mnemonic, setMnemonic] = useState('');
  const [verify, setVerify] = useState<string[]>([]);
  const [shuffled, setShuffled] = useState([]);
  const [wrong, setWrong] = useState<null | number>();
  const [includedIndex, setIncludedIndex] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMenmonic = async (): Promise<void> => {
      const result = await browser.storage.local.get('mnemonic');
      setMnemonic(result.mnemonic);
      setShuffled(result.mnemonic.split(' ').sort(() => 0.5 - Math.random()));
    };
    getMenmonic().catch(console.error);
  }, []);

  const checkWord = (word: string, index: number): void => {
    const arr = mnemonic.split(' ');
    if (arr[verify.length] === word) {
      setVerify((prev) => [...prev, word]);
      setIncludedIndex((prev) => [...prev, index]);
      setWrong(null);
    } else {
      setWrong(index);
    }
  };

  const navigateToHome = (): void => {
    navigate('/popup.html');
  };
  return (
    <div className="step column">
      <div className="step__nav">
        {onBackStep && (
          <button onClick={onBackStep}>
            <IconBack fill="#191C1F" />
          </button>
        )}
      </div>
      <h3 className="step__verify__title">Verify</h3>
      <span className="step__verify__subtitle">
        Please tap on the words from your recovery phrase in the right order{' '}
      </span>
      <div className="step__content">
        <div className="step__verify__words">
          <span>{verify.join(' ')}</span>
        </div>
      </div>

      {verify.length === shuffled.length ? (
        <div className="column step__buttons">
          <Button onClick={navigateToHome}> Done</Button>
        </div>
      ) : (
        <div className="step__verify__buttons">
          {shuffled.map((word, i) => (
            <Button
              key={i}
              onClick={(): void => checkWord(word, i)}
              disabled={includedIndex.includes(i)}
              negative={wrong === i}
              size="small"
            >
              {word}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Verify;
