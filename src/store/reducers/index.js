import { combineReducers } from 'redux';
import PokemonList from './PokemonList';
import PokeTypes from './PokeTypes';
import PageCount from './PageCount';

export default combineReducers({
  PokemonList,
  PokeTypes,
  PageCount
});
