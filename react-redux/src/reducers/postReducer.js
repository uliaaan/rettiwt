import { GET_POSTS, POSTS_LOADING, ADD_POST } from '../actions/types';

const initialState = {
  list: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        list: [action.payload, ...state.list]
      };
    default:
      return state;
  }
}
