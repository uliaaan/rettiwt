import axios from 'axios';

import {
  GET_POSTS,
  POSTS_LOADING,
  FOLLOW,
  UNFOLLOW,
  GET_PROFILE,
  PROFILE_LOADING
} from './types';

export const getPostsByUserId = userId => dispatch => {
  dispatch(postsLoading());
  axios
    .get(`/api/posts/${userId}`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getUserProfile = userId => dispatch => {
  dispatch(profileLoading());
  axios
    .get(`/api/users/${userId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const follow = userId => dispatch => {
  axios.post(`/api/users/follow`, userId).then(res =>
    dispatch({
      type: FOLLOW,
      payload: res.data.userId
    })
  );
};

export const unFollow = userId => dispatch => {
  axios.post(`/api/users/unfollow`, userId).then(res =>
    dispatch({
      type: UNFOLLOW,
      payload: res.data.userId
    })
  );
};

// List loading
export const postsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};

export const profileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
