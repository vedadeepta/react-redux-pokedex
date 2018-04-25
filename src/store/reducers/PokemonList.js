const initialState = {
  pokemons: [], // all pokemons passed into React
  total: 0, // total count of all the pokemons needed for pagination
  fetching: false,
  pokeTypeAPI: false, // indicates if poketype needs to be fetched from api
  error: false,
  msg: '', // message to be displayed in snackbar
  type: 'none',
  favs: [],
  cache: {}
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
        const cache = state.cache;
        cache[state.type] = (
          (typeof cache[state.type] === 'undefined') ?
            [action.value.pokeData]
          :
            cache[state.type].concat(action.value.pokeData)
        );

        return Object.assign(
          {},
          state,
          {
            fetching: false,
            pokeTypeAPI: false,
            pokemons: state.pokemons.concat(action.value.pokeData),
            cache
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
    case 'ADD_POKE' : {
      return Object.assign(
        {},
        state,
        {
          pokemons: state.pokemons.concat(action.value.pokeobj)
        }
      );
    }
    case 'ADD_FAV' : {
      return Object.assign(
        {},
        state,
        {
          favs: state.favs.concat(action.value.poke)
        }
      );
    }
    case 'SET_FAVS' : {
      return Object.assign(
        {},
        state,
        {
          pokemons: state.favs
        }
      );
    }
    case 'SET_CACHE' : {
      return Object.assign(
        {},
        state,
        {
          pokemons: state.cache[action.value.type]
        }
      );
    }
    case 'EDIT' : {
      /*eslint-disable  */
      const pokemons = state.pokemons;
      let i = 0;
      for (i = 0; i < pokemons.length; i += 1) {
        if (pokemons[i].id === action.value.id) {
          break;
        }
      }
      const ep = Object.assign(pokemons[i], action.value.editData);
      console.log(ep);
      const newpokelist = pokemons.slice(0, i).concat([ep]).concat(pokemons.slice(i + 1));
      return Object.assign(
        {},
        state,
        {
          pokemons: newpokelist
        }
      );
    }
    case 'DEL' : {
      const pokemons = state.pokemons;
      let i = 0;
      for(i = 0; i < pokemons.length; i += 1) {
        if(pokemons[i].id === action.value.id) {
          break;
        }
      }
      const newpokeList = pokemons.slice(0, i).concat(pokemons.slice(i + 1));
      return Object.assign(
        {},
        state,
        {
          pokemons: newpokeList
        }
      );
    }
    case 'SEARCHAPI' : {
      return Object.assign(
        {},
        state,
        {
          pokemons: state.pokemons.concat(action.value.data)
        }
      );
    }
    default : {
      return state;
    }
  }
}
