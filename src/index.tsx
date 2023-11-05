import React from 'react';
import { createRoot } from 'react-dom/client';
import Provider from './provider';
import './index.css';

const BetsTable = React.lazy(() => import('@src/containers/bets-table'));

createRoot(document.getElementById('root')).render(
  <Provider>
    <BetsTable />
  </Provider>,
);
