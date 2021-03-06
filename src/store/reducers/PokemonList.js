const initialState = {
  pokemons: [], // all pokemons passed into React
  total: 0, // total count of all the pokemons needed for pagination
  fetching: false,
  pokeTypeAPI: false, // indicates if poketype needs to be fetched from api
  error: false,
  msg: '', // message to be displayed in snackbar
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
          pokemons: [],
          msg: 'Fetching pokemons'
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
            pokemons: state.pokemons.concat(action.value.pokeData)
          }
        );
      }
      return state;
    }
    case 'FETCH_POKEMONS_ERROR' : {
      return Object.assign(
        {},
        state,
        {
          fetching: false,
          error: true,
          msg: 'Error fetching pokemons'
        }
      );
    }
    case 'FETCH_POKETYPE' : {
      return Object.assign(
        {},
        state,
        {
          type: action.value.type,
          msg: `Fetching pokemons of type ${action.value.type}`,
          pokeTypeAPI: true,
          pokemons: []
        }
      );
    }
    case 'SET_TYPE' : {
      return Object.assign(
        {},
        state,
        {
          type: 'none',
          pokemons: [],
        }
      );
    }
    default : {
      return state;
    }
  }
}
