import React from 'react';
import '@src/index.scss';
import '@carbon/charts-react/styles.css';

import { createRoot } from 'react-dom/client';
import App from '@src/App';
import { HashRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);
