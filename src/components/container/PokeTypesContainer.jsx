import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* ACTIONS */
import pokeTypesFetch from '../../store/actionCreator/getPokeTypes';
/* DUMB */
import PokeType from '../dumb/PokeType';

class PokeTypesContainer extends React.Component {

  componentWillMount() {
    if (!this.props.pokeTypes.length) {
      this.props.pokeTypesFetch();
    }
  }

  render() {
    const pokeTypes = this.props.pokeTypes;
    return (
      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 5,
          marginRight: 5,
          textAlign: 'center'
        }}
      >
        Types
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {
            pokeTypes ?
              pokeTypes.map(type => (
                <PokeType type={type.name} />
              ))
            :
              null
          }
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    pokeTypes: store.PokeTypes.pokeTypes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pokeTypesFetch: () => dispatch(pokeTypesFetch())
  };
};
PokeTypesContainer.propTypes = {
  pokeTypesFetch: PropTypes.func,
  pokeTypes: PropTypes.array
};
export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(PokeTypesContainer);
