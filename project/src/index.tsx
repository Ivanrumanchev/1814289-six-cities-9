import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

type Settings = {
  placesCount: number;
}

const Setting: Settings = {
  placesCount: 111,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      placesCount = { Setting.placesCount }
    />
  </React.StrictMode>,
  document.getElementById('root'));
