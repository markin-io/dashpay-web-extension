import * as React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import Popup from './Popup';
import Send from '../screens/Send';
import Home from '../screens/Home';
import ImportWallet from '../screens/ImportWallet';
import CreateWallet from '../screens/CreateWallet';
import Security from '../screens/More/Tabs/Security';
import More from '../screens/More/More';
import ViewPhrase from '../screens/More/Tabs/ViewPhrase';
import ResetWallet from '../screens/More/Tabs/ResetWallet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/popup.html" element={<Popup />}>
          <Route index element={<Home />} />
          <Route path="send" element={<Send />} errorElement={<Home />} />
          <Route path="more" element={<Outlet />}>
            <Route index element={<More />} />
            <Route path="security" element={<Outlet />}>
              <Route index element={<Security />} />
              <Route path="phrase" element={<ViewPhrase />} />
              <Route path="reset-wallet" element={<ResetWallet />} />
            </Route>
          </Route>
        </Route>
        <Route path="/import" element={<ImportWallet />} />
        <Route path="/create" element={<CreateWallet />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('popup-root'));
