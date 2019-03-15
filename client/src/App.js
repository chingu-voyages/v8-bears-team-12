import {hot} from 'react-hot-loader/root';
import React from 'react';

require('./style.css');
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Meet and Eat App</h1>
        <p>Hello v8-bears-team-12!</p>
      </>
    );
  }
}

export default hot(App);
