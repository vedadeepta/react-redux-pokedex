import axios from 'axios';

export default function pokeTypeFetch() {
  return (dispatch) => {
    dispatch({ type: 'FETCH_POKETYPES' });
    return axios.get('https://pokeapi.co/api/v2/type')
        .then((response) => {
          dispatch({
            type: 'FETCH_POKETYPES_COMPLETE',
            value: {
              pokeTypes: response.data.results
            }
          });
        })
        .catch(() => {
          dispatch({ type: 'FETCH_POKETYPES_ERROR' });
        });
  };
}
