/*eslint-disable*/
import React from 'react';
import SearchBar from 'material-ui-search-bar';
import { connect } from 'react-redux';

/*ACTIONS*/
import search from '../../store/actionCreator/doSearch';

class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.dispatch(search(value.replace(/ /g, '')));
  }

  render() {
    return (
      <SearchBar
        onChange={this.handleChange}
        style={{
          marginTop: 6,
          maxWidth: 800
        }}
      />
    );
  }
}

export default connect(
)(SearchBarContainer);
