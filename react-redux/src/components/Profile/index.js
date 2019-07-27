import React from 'react';
import { connect } from 'react-redux';

import { getPostsByUserId } from '../../actions/profileActions';

import List from '../Posts/List';
import Info from './Info';

const Profile = ({ getPostsByUserId, match, posts, profile }) => {
  React.useEffect(() => {
    getPostsByUserId(match.params.userid);
  }, [getPostsByUserId, match]);

  return (
    <>
      <Info match={match} postCount={posts.list.length} />
      <List list={posts.list} loading={posts.loading} />
    </>
  );
};

const mapStateToProps = state => ({
  posts: state.posts,
  profile: state.profile,
  user: state.auth
});

export default connect(
  mapStateToProps,
  { getPostsByUserId }
)(Profile);
