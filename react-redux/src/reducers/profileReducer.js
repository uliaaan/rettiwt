import { GET_PROFILE, PROFILE_LOADING } from '../actions/types';

const initialState = {
  user: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
