import React from 'react';
import ReactDom from 'react-dom';

class TextCompleter extends React.Component {
  constructor(props) {
    super(props);

    this.sourceValue = null;
    this.sourceValues = [];
    this.state = {
      query: null,
      value: this.props.defaultValue,
      sourceActive: 0
    };
  }

  getInputNode() {
    return ReactDom.findDOMNode(
      this.refs.input.getInputNode ? this.refs.input.getInputNode() : this.refs.input);
  }

  getQueryPos(value) {
    const cursorPos = this.getInputNode().selectionStart;

    // array position of the current lookup-query
    return value.substr(0, cursorPos).split(this.props.wordSeparator).length - 1;
  }

  updateQuery(value) {
    const cursorPos = this.getInputNode().selectionStart;
    const words = value.split(this.props.wordSeparator);
    const queryPos = this.getQueryPos(value);

    if (value.charAt(cursorPos - 1) != this.props.wordSeparator) {
      this.setState({
        query: words[queryPos]
      });
    } else {
      this.setState({
        query: null
      });
    }
  }

  selectItem() {
    const node = this.getInputNode();
    const words = this.state.value.split(this.props.wordSeparator);
    const queryPos = this.getQueryPos(this.state.value);
    words[queryPos] = this.sourceValue;

    // if cursor is at the end >> add wordSeparator
    if (node.selectionStart == this.state.value.length) {
      words[words.length - 1] = words[words.length - 1] + this.props.wordSeparator;
    }

    this.setState({
      value: words.join(this.props.wordSeparator),
      query: null
    }, () => {
      const newPos = words.slice(0, queryPos + 1)
        .join(this.props.wordSeparator).length + 1;
      node.selectionStart = node.selectionEnd = newPos;

      // onChange
      node.dispatchEvent(new Event('input', { bubbles: true }));
    });

    node.focus();
  }

  onChange(e) {
    const value = e.target.value;
    this.updateQuery(value);
    this.setState({
      value
    });

    if (this.props.onChange) this.props.onChange(e);
  }

  onKeyUp(e) {
    switch (e.keyCode) {
    case 37: // left
    case 39: // right
      this.updateQuery(this.state.value);
      break;

    default:
      break;
    }
  }

  onKeyDown(e) {
    if (this.sourceValue === null) return;

    switch (e.keyCode) {
    case 38: // up
      this.setState({
        sourceActive: this.state.sourceActive - 1
      });
      e.preventDefault();
      break;

    case 40: // down
      this.setState({
        sourceActive: this.state.sourceActive + 1
      });
      e.preventDefault();
      break;

    case 9: // tab
    case 13: // enter
      if (this.sourceValue !== null) e.preventDefault();

      this.selectItem();
      break;

    default:
      break;
    }
  }

  onSourceChange(childIndex, value, from) {
    if (from === 'changeActive') this.sourceValue = value;
    else {
      // on prend la premiere value non null
      if (childIndex === 0) {
        this.sourceValue = value;
      } else if (this.sourceValue === null) {
        this.sourceValue = value;
      }

      if (childIndex === (React.Children.count(this.props.children) - 1)) {
        if (this.sourceValue === null) this.changeSourceActive(0);
      }
    }
  }

  changeSourceActive(sourceActive) {
    this.setState({sourceActive});
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.value !== prevState.value) this.props.onChange(this.state.value);
  // }

  render() {
    const children = React.Children.map(
      this.props.children,
      (child, i) => React.cloneElement(child, {
        query: this.state.query,
        itemActive: this.state.sourceActive,
        onValueChange: this.onSourceChange.bind(this, i),
        onActiveChange: this.changeSourceActive.bind(this),
        onSelect: (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.selectItem();
        }
      })
    );

    const input = (this.props.input !== null) ? this.props.input : <textarea />;

    return (
      <div>
        {React.cloneElement(input, {
          onKeyUp: this.onKeyUp.bind(this),
          onKeyDown: this.onKeyDown.bind(this),
          onChange: this.onChange.bind(this),
          value: this.state.value,
          ref: 'input'
        })}
        {children}
      </div>
    );
  }
}

TextCompleter.defaultProps = {
  wordSeparator: ' ',
  onChange: (value) => {},
  defaultValue: '',
  input: null
};

export default TextCompleter ;
