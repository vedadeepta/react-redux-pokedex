import { combineReducers } from 'redux';
import PokemonList from './PokemonList';
import PokeTypes from './PokeTypes';
import PageCount from './PageCount';
import TypePagination from './TypePagination';
import SearchPhrase from './SearchPhrase';

export default combineReducers({
  PokemonList,
  PokeTypes,
  PageCount,
  TypePagination,
  SearchPhrase
});
