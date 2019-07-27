import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  paper: {
    padding: 8,
    margin: '10px 0',
    display: 'flex'
  },
  avatar: {
    minWidth: 10,
    margin: '4px 10px 4px 4px',
    borderRadius: 3
  },
  login: {
    marginTop: 0,
    marginBottom: 5
  },
  time: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'normal',
    color: '#bbb'
  }
};

const Item = ({ post, classes }) => {
  return (
    <Paper className={classes.paper}>
      <div
        className={classes.avatar}
        style={{
          backgroundColor: `#${post.user.id.slice(post.user.id.length - 3)}`
        }}
      />
      <div>
        <h3 className={classes.login}>
          <Link to={`/profile/${post.user.id}`}>{post.user.login}</Link>
          <span className={classes.time}>
            {new Date(post.createdAt).toLocaleDateString('en-EN')}
          </span>
        </h3>
        {post.text}
      </div>
    </Paper>
  );
};

export default withStyles(styles)(Item);
