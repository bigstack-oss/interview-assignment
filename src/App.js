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
          if (res.ok) {
            return res.json();
          } else {
            console.error(res.status);
          }
        })
        .then(data => {
          console.log(data);
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
