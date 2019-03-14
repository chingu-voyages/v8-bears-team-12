import {hot} from 'react-hot-loader/root';
import React from 'react';

require('./style.css');
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Meet and Eat App</h1>
        <p>Hello v8-bears-team!</p>
      </div>
    );
  }
}

export default hot(App);
