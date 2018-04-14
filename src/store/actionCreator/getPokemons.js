import axios from 'axios';

// fetch intial pokemons data
export function pokeFetch(limit) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_POKEMONS' });
    return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
            .then((response) => {
              const pokemons = response.data.results;
              const count = response.data.count;
              const nextUrl = response.data.next;
              dispatch({
                type: 'FETCH_POKEMONS_COMPLETE',
                value: {
                  count,
                  nextUrl,
                }
              });
              pokemons.map((poke) => {
                dispatch({ type: 'FETCH_POKEDATA' });
                return axios.get(poke.url)
                  .then((res) => {
                    dispatch({
                      type: 'FETCH_POKEDATA_COMPLETE',
                      value: {
                        pokeData: res.data
                      }
                    });
                  });
              });
            })
            .catch(() => {
              dispatch({ type: 'FETCH_POKEDATA_ERROR' });
            });
  };
}

export function groupByType(type) {
  return (dispatch) => {
    dispatch({
      type: 'GROUP_BY_TYPE',
      value: {
        type
      }
    });
  };
}
export function fetchPokeType(type) {
  return (dispatch) => {
    axios.get(`https://pokeapi.co/api/v2/type/${type}`)
        .then((response) => {
          const pokemons = response.data.pokemon.map(poke => poke.pokemon);
          pokemons.map((poke) => {
            dispatch({ type: 'FETCH_POKEDATA' });
            return axios.get(poke.url)
              .then((res) => {
                dispatch({
                  type: 'FETCH_POKEDATA_COMPLETE',
                  value: {
                    pokeData: res.data
                  }
                });
              });
          });
        })
        .catch(() => {
          dispatch({ type: 'FETCH_POKEDATA_ERROR' });
        });
  };
}
