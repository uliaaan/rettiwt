import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {
  getPostsByUserId,
  getUserProfile,
  refreshUserProfile,
  follow,
  unFollow
} from '../../actions/profileActions';
import Item from '../Posts/Item';
import PreLoader from './PreLoader';
import Process from '../Common/Process';

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

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnFollow = this.handleUnFollow.bind(this);
  }

  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userid);
    this.props.getPostsByUserId(this.props.match.params.userid);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userid !== this.props.match.params.userid) {
      this.props.getUserProfile(this.props.match.params.userid);
      this.props.getPostsByUserId(this.props.match.params.userid);
    }
    if (this.props.auth) {
      if (prevProps.user.following !== this.props.user.following) {
        this.props.refreshUserProfile(this.props.match.params.userid);
      }
    }
  }

  handleFollow = () => {
    this.props.follow({ userId: this.props.match.params.userid });
  };

  handleUnFollow = () => {
    this.props.unFollow({ userId: this.props.match.params.userid });
  };

  render() {
    const {
      list,
      loadingPosts,
      loadingProfile,
      user,
      profile,
      auth,
      classes
    } = this.props;

    const items = list && list.map(post => <Item post={post} key={post._id} />);

    let followBtn;
    if (auth) {
      if (
        user &&
        user.following &&
        user.following.indexOf(this.props.match.params.userid) === -1
      ) {
        followBtn = (
          <Button
            variant="outlined"
            className={classes.buttonFollow}
            onClick={this.handleFollow}
          >
            Follow
          </Button>
        );
      } else {
        followBtn = (
          <Button
            variant="outlined"
            className={classes.buttonUnfollow}
            onClick={this.handleUnFollow}
          >
            Unfollow
          </Button>
        );
      }
    }

    let profileInfo;
    if (profile && items) {
      profileInfo = (
        <Paper className={classes.paper}>
          <h1 className={classes.title}>{profile.login}</h1>
          <div className={classes.email}>{profile.email}</div>
          <div className={classes.statBlock}>
            <div className={classes.stat}>
              {items.length}
              <span className={classes.statTitle}>Posts</span>
            </div>
            <div className={classes.stat}>
              {profile.following.length}
              <span className={classes.statTitle}>Following</span>
            </div>
            <div className={classes.stat}>
              {profile.followers.length}
              <span className={classes.statTitle}>Followers</span>
            </div>
            <div className={classes.button}>{followBtn}</div>
          </div>
        </Paper>
      );
    }

    return (
      <>
        {loadingProfile ? <PreLoader /> : profileInfo}
        {loadingPosts ? <Process /> : items}
      </>
    );
  }
}

Profile.propTypes = {
  getPostsByUserId: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  refreshUserProfile: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired,
  list: PropTypes.array
};

const mapStateToProps = state => ({
  list: state.posts.list,
  loadingPosts: state.posts.loading,
  loadingProfile: state.profile.loading,
  user: state.auth.user,
  auth: state.auth.isAuthenticated,
  profile: state.profile.user
});

export default connect(
  mapStateToProps,
  { getPostsByUserId, getUserProfile, refreshUserProfile, follow, unFollow }
)(withStyles(styles)(Profile));
