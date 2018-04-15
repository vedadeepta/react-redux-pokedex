import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
/* Containers*/
import SearchBarContainer from './SearchBarContainer';
import PokeTypesContainer from './PokeTypesContainer';
import PaginationContainer from './PaginationContainer';
/* ACTIONS */
import {
  pokeFetch,
  fetchPokeType,
  setPokeType
} from '../../store/actionCreator/getPokemons';
/* DUMB COMPONENTS */
import PokeGrid from '../dumb/PokeGrid';
import SnackbarWrapper from '../dumb/SnackbarWrapper';

class PokeGridContainer extends React.Component {
  constructor(props) {
    super(props);
    this.limit = 35;
  }

  componentWillMount() {
    if (
      this.props.location.pathname.split('/')[1] === 'type'
    ) {
      this.props.fetchPokeType(this.props.location.pathname.split('/')[2]);
    } else {
      this.props.setPokeType();
      this.props.pokeFetch(this.limit, (this.props.current - 1) * this.limit);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.pathname.split('/')[1] === 'type' &&
      nextProps.location.pathname.split('/')[2] !==
      this.props.location.pathname.split('/')[2]
    ) {
      nextProps.fetchPokeType(nextProps.location.pathname.split('/')[2]);
    }
    if (nextProps.current !== this.props.current) {
      this.props.pokeFetch(this.limit, (nextProps.current - 1) * this.limit);
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
          this.props.fetching ?
            <center>
              <CircularProgress />
            </center>
          :
            <div>
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
              <PaginationContainer />
            </div>
        }
        <SnackbarWrapper
          open={this.props.error}
          message="Error in fetching Pokemons"
        />
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    pokemons: store.PokemonList.pokemons,
    pokeTypeAPI: store.PokemonList.pokeTypeAPI,
    current: store.PageCount.count,
    fetching: store.PokemonList.fetching,
    error: store.PokemonList.error
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    pokeFetch: (limit, offset) => dispatch(pokeFetch(limit, offset)),
    fetchPokeType: type => dispatch(fetchPokeType(type)),
    setPokeType: () => dispatch(setPokeType())
  };
};

PokeGridContainer.propTypes = {
  pokeFetch: PropTypes.func,
  fetchPokeType: PropTypes.func,
  setPokeType: PropTypes.func,
  pokemons: PropTypes.array,
  location: PropTypes.object,
  pathname: PropTypes.string,
  pokeTypeAPI: PropTypes.bool,
  current: PropTypes.number,
  fetching: PropTypes.bool,
  error: PropTypes.bool
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(PokeGridContainer);

