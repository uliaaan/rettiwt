import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import socket from '../../socket';
import {
  getPosts,
  addedPost,
  getPostsByFollowingUsers
} from '../../actions/postActions';
import Item from './Item';
import Form from './Form';
import Process from '../Common/Process';

class List extends Component {
  state = {
    allPosts: false
  };

  componentDidMount() {
    socket.instance.on('newPost', data => {
      console.log(`newPost: ${JSON.stringify(data)}`);
      this.props.addedPost(data);
    });
    this.props.getPostsByFollowingUsers(this.props.following);
  }

  componentWillUnmount() {
    socket.instance.removeListener('newPost');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.allPosts !== this.state.allPosts) {
      this.state.allPosts
        ? this.props.getPosts()
        : this.props.getPostsByFollowingUsers(this.props.following);
    }
  }

  handleSwitch = () => {
    this.setState({ allPosts: !this.state.allPosts });
  };

  render() {
    const { list, loading, following } = this.props;
    const { allPosts } = this.state;

    let items;
    items = list && list.map(el => <Item post={el} key={el._id} />);
    if (!allPosts && following.length === 0) {
      items = <h3 style={{ textAlign: 'center' }}>Follow anyone</h3>;
    }

    return (
      <div>
        <Form />
        <FormControlLabel
          control={
            <Switch
              checked={allPosts}
              onChange={this.handleSwitch}
              aria-label="LoginSwitch"
            />
          }
          label={allPosts ? 'All Posts' : 'Posts By Following Users'}
        />
        {loading ? <Process /> : items}
      </div>
    );
  }
}

List.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getPostsByFollowingUsers: PropTypes.func.isRequired,
  addedPost: PropTypes.func.isRequired,
  list: PropTypes.array,
  following: PropTypes.array
};

const mapStateToProps = state => ({
  list: state.posts.list,
  loading: state.posts.loading,
  following: state.auth.user.following
});

export default connect(
  mapStateToProps,
  { getPosts, addedPost, getPostsByFollowingUsers }
)(List);
