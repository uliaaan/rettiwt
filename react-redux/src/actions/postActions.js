import axios from 'axios';

import { GET_POSTS, POSTS_LOADING, ADD_POST } from './types';

// List with posts
export const getPosts = () => dispatch => {
  dispatch(postsLoading());
  axios
    .get('/api/posts/')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getPostsByFollowingUsers = following => dispatch => {
  dispatch(postsLoading());
  axios
    .get('/api/posts/', {
      params: {
        following: following
      }
    })
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const addPost = postData => dispatch => {
  axios.post('/api/posts', postData);
};

export const addedPost = post => dispatch => {
  dispatch({
    type: ADD_POST,
    payload: post
  });
};

// List loading
export const postsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
