import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
/* Containers*/
import SearchBarContainer from './SearchBarContainer';
import PokeTypesContainer from './PokeTypesContainer';
/* ACTIONS */
import {
  pokeFetch,
  groupByType,
  fetchPokeType
} from '../../store/actionCreator/getPokemons';
/* DUMB COMPONENTS */
import PokeGrid from '../dumb/PokeGrid';

class PokeGridContainer extends React.Component {
  constructor(props) {
    super(props);
    this.limit = 10;
    this.offset = 0;
  }

  componentWillMount() {
    if (
      this.props.location.pathname.split('/')[1] === 'type'
    ) {
      this.props.groupByType(this.props.location.pathname.split('/')[2]);
    } else if (this.props.pokemons) {
      this.props.pokeFetch(10);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.pathname.split('/')[1] === 'type' &&
      nextProps.location.pathname.split('/')[2] !==
      this.props.location.pathname.split('/')[2]
    ) {
      nextProps.groupByType(nextProps.location.pathname.split('/')[2]);
    }
    if (nextProps.pokeTypeAPI && !this.props.pokeTypeAPI) {
      this.props.fetchPokeType(nextProps.location.pathname.split('/')[2]);
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title="Get'em all"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        >
          <SearchBarContainer />
        </AppBar>
        <PokeTypesContainer />
        {
          this.props.pokeTypeAPI ?
            <center>
              <CircularProgress />
            </center>
          :
            <PokeGrid
              pokemons={this.props.pokemons}
            />
        }
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    pokemons: store.PokemonList.pokemons,
    pokeTypeAPI: store.PokemonList.pokeTypeAPI
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    pokeFetch: (limit, offset) => dispatch(pokeFetch(limit, offset)),
    groupByType: type => dispatch(groupByType(type)),
    fetchPokeType: type => dispatch(fetchPokeType(type))
  };
};

PokeGridContainer.propTypes = {
  pokeFetch: PropTypes.func,
  groupByType: PropTypes.func,
  fetchPokeType: PropTypes.func,
  pokemons: PropTypes.array,
  location: PropTypes.object,
  pathname: PropTypes.string,
  pokeTypeAPI: PropTypes.number
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(PokeGridContainer);

