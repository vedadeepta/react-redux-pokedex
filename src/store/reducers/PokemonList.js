const initialState = {
  allPokemons: [], // all pokemons data
  pokemons: [], // filtered pokemons passed into React
  count: 0, // total count of all the pokemons needed for pagination
  fetching: false,
  fetched: false,
  pokeTypeAPI: false, // indicates if poketype needs to be fetched from api
  error: false,
  type: 'none'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_POKEMONS' : {
      return Object.assign({}, state, { fetching: true });
    }
    case 'FETCH_POKEMONS_COMPLETE' : {
      return Object.assign(
        {},
        state,
        {
          fetching: false,
          fetched: true,
          count: action.value.count,
        }
      );
    }
    case 'SEARCH' : {
      const phrase = action.value.phrase;
      const pokemons = state.allPokemons;
      let pokeFilter = [];
      if (phrase.length !== 0) {
        pokeFilter = pokemons.filter(poke => poke.name.includes(phrase));
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
    case 'GROUP_BY_TYPE' : {
      const type = action.value.type;
      const pokemons = state.allPokemons;
      const pokeFilter = pokemons.filter((data) => {
        const types = data.types.map(t => t.type.name);
        return types.includes(type);
      });
      return Object.assign(
        {},
        state,
        {
          pokemons: pokeFilter,
          type: action.value.type,
          pokeTypeAPI: !pokeFilter.length
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
      const poketypes = action.value.pokeData.types.map(t => t.type.name);
      if (poketypes.includes(state.type) || state.type === 'none') {
        return Object.assign(
          {},
          state,
          {
            fetching: false,
            fetched: true,
            pokeTypeAPI: false,
            allPokemons: state.pokemons.concat(action.value.pokeData),
            pokemons: state.pokemons.concat(action.value.pokeData)
          }
        );
      }
      return state;
    }
    case 'FETCH_POKEDATA_ERROR' : {
      return Object.assign({}, state, { fetching: false, error: true });
    }
    case 'FETCH_POKEMONS_ERROR' : {
      return Object.assign({}, state, { fetching: false, error: true });
    }
    case 'FETCH_MORE_POKEMONS_COMPLETE' : {
      return Object.assign(
        {},
        state,
        {
          allPokemons: state.allPokemons.concat(action.value.pokemons),
          pokemons: state.pokemons.concat(action.value.pokemons),
          nextUrl: action.value.nextUrl
        }
      );
    }
    default : {
      return state;
    }
  }
}
