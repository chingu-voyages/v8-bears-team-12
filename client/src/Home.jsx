import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

function Home() {
  const loggedIn = false;

  return <>{loggedIn ? <Dashboard /> : <Login />}</>;
}

export default Home;
