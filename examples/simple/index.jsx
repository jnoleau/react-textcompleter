import React from 'react';
import * as Data from '../data';
import {TextCompleter, TokenSource} from 'root/src';

class Simple extends React.Component {

  onChange(e) {
    console.log('change', e.target.value);
  }

  render() {
    return (
      <div>
        <TextCompleter defaultValue='xxx' onChange={this.onChange.bind(this)}>
          <TokenSource token="@" data={Data.languages} />
        </TextCompleter>
      </div>
    );
  }
}

export default Simple;
