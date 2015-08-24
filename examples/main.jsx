import React from 'react';
import Simple from './simple/index.jsx';
import TwitterMessage from './twitter/index.jsx';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Simple />
        <hr />
        <TwitterMessage />
      </div>
    );
  }
}

React.render(
  <Main />,
  document.getElementById('main')
);
