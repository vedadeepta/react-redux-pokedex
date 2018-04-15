const initialState = {
  allPokemons: [], // all pokemons data
  pokemons: [], // filtered pokemons passed into React
  total: 0, // total count of all the pokemons needed for pagination
  fetching: false,
  pokeTypeAPI: false, // indicates if poketype needs to be fetched from api
  error: false,
  type: 'none'
};

/**
  *@TODO Figure how to split the reuducer while keeping share state for FETCH AND SERCH/SET
*/
export default function fetchReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_POKEMONS' : {
      return Object.assign(
        {},
        state,
        {
          fetching: true,
          allPokemons: [],
          pokemons: []
        }
      );
    }
    case 'FETCH_POKEMONS_COMPLETE' : {
      return Object.assign(
        {},
        state,
        {
          total: action.value.count
        }
      );
    }
    case 'FETCH_POKEDATA' : {
      return Object.assign(
        {},
        state,
        {
          fetching: true
        }
      );
    }
    case 'FETCH_POKEDATA_COMPLETE' : {
      const pokemontypes = action.value.pokeData.types.map(t => t.type.name);
      if (pokemontypes.includes(state.type) || state.type === 'none') {
        return Object.assign(
          {},
          state,
          {
            fetching: false,
            pokeTypeAPI: false,
            allPokemons: state.pokemons.concat(action.value.pokeData),
            pokemons: state.pokemons.concat(action.value.pokeData)
          }
        );
      }
      return Object.assign(
        {},
        state,
        {
          fetching: false,
          pokeTypeAPI: false
        }
      );
    }
    case 'FETCH_POKEMONS_ERROR' : {
      return Object.assign(
        {},
        state,
        {
          fetching: false,
          error: true
        }
      );
    }
    case 'FETCH_POKETYPE' : {
      return Object.assign(
        {},
        state,
        {
          type: action.value.type,
          pokeTypeAPI: true,
          allPokemons: [],
          pokemons: []
        }
      );
    }
    case 'SEARCH' : {
      const phrase = action.value.phrase;
      const pokemons = state.allPokemons;
      let pokeFilter = [];
      if (phrase.length !== 0) {
        pokeFilter = pokemons.filter(poke => poke.name.includes(phrase.toLowerCase()));
      } else {
        pokeFilter = state.allPokemons;
      }
      return Object.assign(
        {},
        state,
        {
          pokemons: pokeFilter
        }
      );
    }
    case 'SET_TYPE' : {
      return Object.assign(
        {},
        state,
        {
          type: 'none'
        }
      );
    }
    default : {
      return state;
    }
  }
}
