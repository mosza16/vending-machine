import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import OneSignal from 'react-onesignal';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';

require('dotenv').config();

OneSignal.initialize(process.env.REACT_APP_ONESIGNAL_APP_ID);
WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif'],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
