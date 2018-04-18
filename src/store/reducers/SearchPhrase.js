const initialState = {
  phrase: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH' : {
      return Object.assign(
        {},
        state,
        {
          phrase: action.value.phrase
        }
      );
    }
    default : {
      return state;
    }
  }
}
