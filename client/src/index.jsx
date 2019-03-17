import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function renderApp() {
  const root = document.getElementById('root');
  if (root) ReactDOM.render(<App />, root);
}

renderApp();
