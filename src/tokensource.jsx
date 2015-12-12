import React from 'react';

class TokenSource extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      active: 0,
      pending: false
    };
  }

  setItems(items) {
    this.setState({
      items: items.slice(0, this.props.itemNumber),
      active: 0,
      pending: false
    });
    this.props.onValueChange(items.length ? this.props.itemValue(items[0]) : null, 'query');
  }

  getQuery(props) {
    return props.query.substr(props.token.length);
  }

  componentWillReceiveProps(nextProps) {
    let items = [];

    if (nextProps.query != this.props.query) {
      if (
        nextProps.query !== null
        && nextProps.query.length > nextProps.token.length
        && nextProps.query.substr(0, nextProps.token.length) === nextProps.token) {
        if (typeof nextProps.data === 'function') {
          items = nextProps.data(this.getQuery(nextProps));
        } else {
          items = nextProps.data
            .filter((item) => ~item.toLowerCase().indexOf(this.getQuery(nextProps).toLowerCase()));
        }

        if (typeof items === 'function') {
          this.setState({
            pending: true
          });
          items(this.setItems.bind(this));
        } else {
          this.setItems(items);
        }
      } else {
        this.setItems([]);
      }
    } else if (nextProps.itemActive !== this.props.itemActive && this.state.items.length > 0) {
      const slicedItems = this.state.items;
      let active = nextProps.itemActive % slicedItems.length;
      if (active < 0) active = slicedItems.length + active;
      this.props.onValueChange(this.props.itemValue(slicedItems[active]), 'changeActive');

      this.setState({active});
    }
  }

  render() {
    const items = this.state.items
      .map((e, i) => {
        let liClass = this.props.stylemap.li + ' ';
        if (i === this.state.active) liClass += this.props.stylemap.active;

        return (
          <li
            key={this.props.itemKey(e)}
            className={liClass}
            onMouseEnter={this.props.onActiveChange.bind(this, i)}
            onClick={this.props.onSelect.bind(this)} >
            {
              (this.props.children) ?

              React.cloneElement(this.props.children, {
                item: e,
                query: this.getQuery(this.props)
              })

              : this.props.itemRender(e, this.getQuery(this.props))
            }
          </li>
        );
      })
      ;

    let ulClass = this.props.stylemap.ul + ' ';
    if (this.state.pending) ulClass += this.props.stylemap.pending;

    if (items.length > 0 || this.state.pending) {
      return <ul className={ulClass}>{ items }</ul>;
    }

    return null;
  }
}

const identity = (x) => x;
const noop = () => {};
TokenSource.defaultProps = {
  token: '@',
  itemNumber: 4,
  itemRender: identity, // (item, query)
  itemValue: identity,
  itemKey: identity,
  data: [],
  stylemap: {
    li: '',
    ul: '',
    pending: 'pending',
    active: 'active'
  },

  // added by textcompleter
  query: '',
  itemActive: 0,
  onValueChange: noop,
  onActiveChange: noop,
  onSelect: noop
};

export default TokenSource;
