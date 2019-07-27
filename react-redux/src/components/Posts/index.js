import React from 'react';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from './List';
import socket from '../../socket';

import {
  getPosts,
  addedPost,
  getPostsByFollowingUsers
} from '../../actions/postActions';

const Posts = ({
  getPostsByFollowingUsers,
  getPosts,
  addedPost,
  following,
  loading,
  list
}) => {
  const [allPosts, setAllPosts] = React.useState(false);

  React.useEffect(() => {
    socket.instance.on('newPost', data => {
      addedPost(data);
    });

    allPosts ? getPosts() : getPostsByFollowingUsers(following);

    return () => socket.instance.removeListener('newPost');
  }, [allPosts, getPostsByFollowingUsers, addedPost, following, getPosts]);

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={allPosts}
            onChange={() => setAllPosts(!allPosts)}
            aria-label="LoginSwitch"
          />
        }
        label={allPosts ? 'All Posts' : 'Posts By Following Users'}
      />
      <List
        allPosts={allPosts}
        list={list}
        loading={loading}
        following={following}
      />
    </>
  );
};

const mapStateToProps = state => ({
  list: state.posts.list,
  loading: state.posts.loading,
  following: state.auth.user.following
});

export default connect(
  mapStateToProps,
  { getPosts, addedPost, getPostsByFollowingUsers }
)(Posts);
