import React from 'react';
import {TextCompleter, TokenSource} from 'root/src';
import Highlighter from 'react-highlighter';
import * as Data from '../data';
import stylemap from './index.css';
import TextField from 'material-ui/lib/text-field';


/**
 * Totally Custom field (here from material-ui)
 *
 * The field must take as props (already good for TextField)
 * onKeyUp(SyntheticEvent): the onKeyUp from input standard
 * onKeyDown(SyntheticEvent): the onKeyDown from input standard
 * onChange(SyntheticEvent): the onChange from input standard
 * value: controlled value
 *
 * If the main node is not an input (or textarea) you also have to define a
 * getInputNode method so as to the TokenCompleter can control the cursor position
 */
class MyTextField extends TextField {
  getInputNode() {
    return this._getInputNode();
  }
}

// custom source renderer
const Follower = ({item, query}) => {
  return (
    <a>
      <img src={item.profile_image_url} />
      <Highlighter search={query}>{item.name + ' @' + item.screen_name}</Highlighter>
    </a>
  );
};

class TwitterMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
  }

  static userIsMatching(user, query) {
    return ~user.screen_name.toLowerCase().indexOf(query.toLowerCase())
        || ~user.name.toLowerCase().indexOf(query.toLowerCase());
  }

  render() {
    const textField = (
      <MyTextField
        floatingLabelText="label"
        multiLine
        fullWidth
        rows={3} />
    );

    return (
      <div className={stylemap.main}>
        <label>The value : {this.state.value}</label>
        <TextCompleter input={textField} onChange={(e) => this.setState({value: e.target.value})}>

          { /* you can use children to render elements */ }
          <TokenSource
            stylemap={stylemap}
            token="@"
            data={(query) =>
              Data.following.filter((u) => TwitterMessage.userIsMatching(u, query))
            }
            itemKey={(item) => item.id_str}
            itemValue={(item) => '@' + item.screen_name}
            >
            <Follower />
          </TokenSource>

          { /* or the itemRender function */ }
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
