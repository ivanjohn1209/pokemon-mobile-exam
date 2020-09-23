import { GET_POKEMON } from "./actionTypes";
import pokemons from "./reducers/pokemons";

export function getPokemon(count) {   
  return dispatch => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`)
    .then(response =>  {
      dispatch({
        type: GET_POKEMON,
        payload :response.json()
      })
      return Promise.resolve(response.json())
      // return response.json()

    })
  }

}

