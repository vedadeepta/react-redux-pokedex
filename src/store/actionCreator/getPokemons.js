import axios from 'axios';

// fetch intial pokemons data
export function pokeFetch(limit, offset) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_POKEMONS' });
    return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then((response) => {
              const pokemons = response.data.results;
              const count = response.data.count;
              dispatch({
                type: 'FETCH_POKEMONS_COMPLETE',
                value: {
                  count
                }
              });
              dispatch({ type: 'FETCH_POKEDATA' });
              pokemons.map((poke) => {
                return axios.get(poke.url)
                  .then((res) => {
                    dispatch({
                      type: 'FETCH_POKEDATA_COMPLETE',
                      value: {
                        pokeData: res.data
                      }
                    });
                  })
                  .catch(() => {
                    dispatch({ type: 'FETCH_POKEMONS_ERROR' });
                  });
              });
            })
            .catch(() => {
              dispatch({ type: 'FETCH_POKEMONS_ERROR' });
            });
  };
}

export function setPokeType() {
  return (dispatch) => {
    dispatch({
      type: 'SET_TYPE',
    });
  };
}

export function fetchPokeType(type) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_POKETYPE',
      value: {
        type
      }
    });
    axios.get(`https://pokeapi.co/api/v2/type/${type}`)
        .then((response) => {
          dispatch({
            type: 'FETCH_POKEMONS_COMPLETE',
            value: {
              count: response.data.pokemon.length
            }
          });
          const pokemons = response.data.pokemon.slice(0, 20).map(poke => poke.pokemon);
          dispatch({ type: 'FETCH_POKEDATA' });
          pokemons.map((poke) => {
            return axios.get(poke.url)
              .then((res) => {
                dispatch({
                  type: 'FETCH_POKEDATA_COMPLETE',
                  value: {
                    pokeData: res.data
                  }
                });
              })
              .catch(() => {
                dispatch({ type: 'FETCH_POKEMONS_ERROR' });
              });
          });
        })
        .catch(() => {
          dispatch({ type: 'FETCH_POKEMONS_ERROR' });
        });
  };
}
