const initialState = {
  pokeTypes: [],
  fetching: false,
  fetched: false,
  error: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_POKETYPES' : {
      return Object.assign({
        fetching: true,
      });
    }
    case 'FETCH_POKETYPES_COMPLETE' : {
      return Object.assign({
        fetching: false,
        pokeTypes: action.value.pokeTypes
      });
    }
    case 'FETCH_POKETYPES_ERROR' : {
      return Object.assign({
        fetching: false,
        error: true
      });
    }
    default : {
      return state;
    }
  }
}
