import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import {GlobalProvider} from './context/GlobalState';
ReactDOM.render(
  <GlobalProvider>
  <App />
  </GlobalProvider>, 
  document.getElementById('root'));
