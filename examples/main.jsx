import React from 'react';
import ReactDom from 'react-dom';
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

ReactDom.render(
  <Main />,
  document.getElementById('main')
);
