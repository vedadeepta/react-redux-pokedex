import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToFav } from '../../store/actionCreator/getPokemons';
import RaisedButton from 'material-ui/RaisedButton';

class AddToFavourite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poke: this.props.poke
    };
  }

  render() {
    return (
      <RaisedButton
        label="add to fav"
        onClick={() => {
          /*eslint-disable*/
          console.log(this.state.poke)
          this.props.dispatch(addToFav(this.state.poke));
        }}
      />
    );
  }
}

AddToFavourite.propTypes = {
  poke: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(
)(AddToFavourite);
