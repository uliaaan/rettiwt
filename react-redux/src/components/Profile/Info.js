import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { getUserProfile, follow, unFollow } from '../../actions/profileActions';
import PreLoader from './PreLoader';

const styles = {
  paper: {
    padding: 8,
    margin: '10px 0'
  },
  title: {
    margin: '0 0 5px 0'
  },
  email: {
    marginBottom: 10,
    color: '#888'
  },
  button: {
    width: '100%',
    textAlign: 'right'
  },
  buttonFollow: {
    borderColor: '#009688',
    color: '#009688',
    '&:hover': {
      backgroundColor: '#009688',
      color: '#fff'
    }
  },
  buttonUnfollow: {
    borderColor: '#009688',
    backgroundColor: '#009688',
    color: '#fff',
    '&:hover': {
      borderColor: '#bbb',
      backgroundColor: '#bbb',
      color: '#fff'
    }
  },
  statBlock: {
    display: 'flex'
  },
  stat: {
    float: 'left',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },
  statTitle: {
    display: 'block',
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 'normal'
  }
};

const Info = ({
  profile,
  classes,
  follow,
  unFollow,
  user,
  match,
  getUserProfile,
  auth,
  postCount
}) => {
  React.useEffect(() => {
    getUserProfile(match.params.userid);
  }, [match, getUserProfile]);

  const handleFollow = () => {
    follow({ userId: match.params.userid });
  };

  const handleUnFollow = () => {
    unFollow({ userId: match.params.userid });
  };

  const notFollow = auth && user.following.indexOf(match.params.userid) === -1;

  const followBtn = (
    <Button
      variant="outlined"
      className={notFollow ? classes.buttonFollow : classes.buttonUnfollow}
      onClick={notFollow ? handleFollow : handleUnFollow}
    >
      {notFollow ? 'Follow' : 'Unfollow'}
    </Button>
  );

  const profileInfo = profile.user && (
    <Paper className={classes.paper}>
      <h1 className={classes.title}>{profile.user.login}</h1>
      <div className={classes.email}>{profile.user.email}</div>
      <div className={classes.statBlock}>
        <div className={classes.stat}>
          {postCount}
          <span className={classes.statTitle}>Posts</span>
        </div>
        <div className={classes.stat}>
          {profile.user.following.length}
          <span className={classes.statTitle}>Following</span>
        </div>
        <div className={classes.stat}>
          {profile.user.followers.length}
          <span className={classes.statTitle}>Followers</span>
        </div>
        {auth && <div className={classes.button}>{followBtn}</div>}
      </div>
    </Paper>
  );

  if (profile.loading) return <PreLoader />;

  return profileInfo;
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth.user,
  auth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getUserProfile, follow, unFollow }
)(withStyles(styles)(Info));
