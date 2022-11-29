import * as React from 'react';

import {browser} from 'webextension-polyfill-ts';

import './styles.scss';
import {FormEvent} from 'react';

const Options: React.FC = () => {
  const [mnemonic, setMnemonic] = React.useState('');

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();

    browser.storage.local
      .set({mnemonic})
      .then(() => {
        setMnemonic('');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="mnemonic">Enter your mnemonic</label>
        <br />
        <input
          type="text"
          id="mnemonic"
          name="mnemonic"
          spellCheck="false"
          autoComplete="off"
          value={mnemonic}
          onChange={(e): void => setMnemonic(e.target.value.trim())}
          required
        />
        <br />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default Options;
