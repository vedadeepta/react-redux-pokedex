import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'material-ui-search-bar';
import { connect } from 'react-redux';

/* ACTIONS */
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
        onRequestSearch={this.handleChange}
        hintText="Search By Name"
        style={{
          marginTop: 6,
          maxWidth: 800
        }}
      />
    );
  }
}

SearchBarContainer.propTypes = {
  dispatch: PropTypes.func
};

export default connect(
)(SearchBarContainer);
