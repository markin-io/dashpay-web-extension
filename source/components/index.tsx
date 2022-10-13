import * as React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Popup from './Popup';
import Send from '../screens/Send';
import Home from '../screens/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Popup />}>
          <Route path="/popup.html" element={<Home />} />
          <Route path="/send" element={<Send />} errorElement={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('popup-root'));
