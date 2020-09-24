import { GET_POKEMON } from "./actionTypes";

export function getPokemon(count) {   
  return dispatch => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${count}&limit=1050`)
    .then(response =>  {
      dispatch({
        type: GET_POKEMON,
        payload :response.json()
      })
      return Promise.resolve(response.json())
    })
  }

}

