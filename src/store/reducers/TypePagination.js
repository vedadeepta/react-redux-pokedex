const initialState = {
  typeData: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'STORE_TYPE_PAGINATION_DATA' : {
      return Object.assign(
        {},
        state,
        {
          typeData: action.value.data
        }
      );
    }
    default : {
      return state;
    }
  }
}
