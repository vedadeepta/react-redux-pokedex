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
                return setTimeout(() => {
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
                }, 0);
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
          dispatch({
            type: 'STORE_TYPE_PAGINATION_DATA',
            value: {
              data: response.data.pokemon
            }
          });
          const pokemons = response.data.pokemon.slice(0, 15).map(poke => poke.pokemon);
          dispatch({ type: 'FETCH_POKEDATA' });
          pokemons.map((poke) => {
            return setTimeout(() => {
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
            }, 0);
          });
        })
        .catch(() => {
          dispatch({ type: 'FETCH_POKEMONS_ERROR' });
        });
  };
}

export function fetchMorePokeType(type, offset) {
  return (dispatch, getState) => {
    const typeData = getState().TypePagination.typeData;
    const pokemons = typeData.slice(offset, 15 + offset).map(poke => poke.pokemon);
    dispatch({
      type: 'FETCH_POKETYPE',
      value: {
        type
      }
    });
    dispatch({ type: 'FETCH_POKEDATA' });
    pokemons.map((poke) => {
      return setTimeout(() => {
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
      }, 0);
    });
  };
}

export function addPoke(pokeobj) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_POKE',
      value: {
        pokeobj
      }
    });
  };
}

export function addToFav(poke) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_FAV',
      value: {
        poke
      }
    });
  };
}

export function setFavs() {
  return (dispatch) => {
    dispatch({
      type: 'SET_FAVS'
    });
  };
}

export function setCache(type) {
  return (dispatch) => {
    dispatch({
      type: 'SET_CACHE',
      value: {
        type
      }
    });
  };
}
export function editPoke(editData, id) {
  return (dispatch) => {
    dispatch({
      type: 'EDIT',
      value: {
        editData,
        id
      }
    });
  };
}

export function deletePoke(id) {
  return (dispatch) => {
    dispatch({
      type: 'DEL',
      value: {
        id
      }
    });
  };
}

export function search(name) {
  return (dispatch) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
          dispatch({
            type: 'SEARCHAPI',
            value: {
              data: response.data
            }
          });
        });
  };
}
