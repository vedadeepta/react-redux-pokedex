const initialState = {
  count: 1
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PAGE_COUNT' : {
      return Object.assign({
        count: action.value.count
      });
    }
    default : {
      return state;
    }
  }
}
