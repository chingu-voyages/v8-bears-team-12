import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function renderApp() {
  let root = document.getElementById('root');
  if (root) ReactDOM.render(<App />, root);
}

renderApp();
