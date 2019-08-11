import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AdminApp from './admin/AdminApp';

function renderApp() {
  const root = document.getElementById('root');
  if (root) ReactDOM.render(<App />, root);
  const admin = document.getElementById('admin');
  if (admin) ReactDOM.render(<AdminApp></AdminApp>, admin);

}

renderApp();
