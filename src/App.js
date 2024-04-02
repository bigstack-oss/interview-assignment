import React, { useEffect } from 'react';
import { Theme } from '@carbon/react';
import { BrowserRouter } from 'react-router-dom';
import UIHeader from '@components/UIHeader';
import '@src/app.scss';

const App = () => {
  // TODO: replace this with your own data fetching code!
  useEffect(() => {
    function getData() {
      fetch('http://localhost:9080/instances')
        .then(res => {
          if (!res.ok) {
            throw new Error('/instances endpoint response error');
          }
          return res.json();
        })
        .then(data => {
          console.log('data:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    getData();
  }, []);

  return (
    <BrowserRouter>
      <Theme theme="g90">
        <UIHeader />
      </Theme>
    </BrowserRouter>
  );
};

export default App;
