import React from 'react';
import {TextCompleter, TokenSource} from 'root/src';
import Highlighter from 'react-highlighter';
import * as Data from '../data';
import stylemap from './index.css';

class TwitterMessage extends React.Component {
  static userIsMatching(user, query) {
    return ~user.screen_name.toLowerCase().indexOf(query.toLowerCase())
        || ~user.name.toLowerCase().indexOf(query.toLowerCase());
  }

  render() {
    return (
      <div className={stylemap.main}>
        <TextCompleter>
          <TokenSource
            stylemap={stylemap}
            token="@"
            data={(query) =>
              Data.following.filter((u) => TwitterMessage.userIsMatching(u, query))
            }
            itemKey={(item) => item.id_str}
            itemValue={(item) => '@' + item.screen_name}
            itemRender={(item, query) => (
              <a>
                <img src={item.profile_image_url} />
                <Highlighter search={query}>{item.name + ' @' + item.screen_name}</Highlighter>
              </a>
            )} />
          <TokenSource
            stylemap={stylemap}
            data={Data.languages}
            token="#"
            itemValue={(item) => '#' + item}
            itemRender={(item, query) => (
              <Highlighter className={stylemap.hashtag} search={query}>{item}</Highlighter>
            )} />
        </TextCompleter>
      </div>
    );
  }
}

export default TwitterMessage;
