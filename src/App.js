import React from 'react';
import { Theme } from '@carbon/react';
import { BrowserRouter } from 'react-router-dom';
import UIHeader from '@components/UIHeader';
import '@src/app.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Theme theme="g90">
        <UIHeader />
      </Theme>
    </BrowserRouter>
  );
};

export default App;
