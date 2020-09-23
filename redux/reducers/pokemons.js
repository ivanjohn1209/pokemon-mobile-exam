import { GET_POKEMON } from "../actionTypes";

const initialState = {};

export default function(state = {}, action) {
  switch (action.type) {
    case GET_POKEMON:
      return  action.payload; 
    default:
      return state;
  }

}
