import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER, FOLLOW, UNFOLLOW } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload]
        }
      };
    case UNFOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            item => item !== action.payload
          )
        }
      };
    default:
      return state;
  }
}
