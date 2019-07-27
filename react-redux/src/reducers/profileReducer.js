import {
  GET_PROFILE,
  PROFILE_LOADING,
  FOLLOW,
  UNFOLLOW
} from '../actions/types';

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
    case FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          followers: [...state.user.followers, action.payload]
        }
      };
    case UNFOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          followers: state.user.followers.filter(
            item => item !== action.payload
          )
        }
      };
    default:
      return state;
  }
}
