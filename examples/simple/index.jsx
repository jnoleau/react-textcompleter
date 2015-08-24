import React from 'react';
import * as Data from '../data';
import {TextCompleter, TokenSource} from 'root/src';

class Simple extends React.Component {
  render() {
    return (
      <div>
        <TextCompleter>
          <TokenSource token="@" data={Data.languages} />
        </TextCompleter>
      </div>
    );
  }
}

export default Simple;
