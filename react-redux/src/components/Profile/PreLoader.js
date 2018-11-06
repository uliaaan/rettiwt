import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = {
  paper: {
    padding: 8,
    margin: '10px 0'
  },
  title: {
    color: '#cacaca',
    backgroundColor: '#cacaca',
    width: 150,
    margin: '0 0 5px 0'
  },
  email: {
    backgroundColor: '#cacaca',
    marginBottom: 10,
    width: 100,
    color: '#cacaca'
  },
  button: {
    width: '100%',
    textAlign: 'right'
  },
  buttonUnfollow: {
    borderColor: '#cacaca',
    backgroundColor: '#cacaca',
    color: '#cacaca'
  },
  stat: {
    backgroundColor: '#cacaca',
    color: '#cacaca',
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

const PreLoader = ({ classes }) => (
  <Paper className={classes.paper}>
    <h1 className={classes.title}>LOADING</h1>
    <div className={classes.email}>LOADING</div>
    <div className={classes.stat}>
      0<span className={classes.statTitle}>Posts</span>
    </div>
    <div className={classes.stat}>
      0<span className={classes.statTitle}>Following</span>
    </div>
    <div className={classes.stat}>
      0<span className={classes.statTitle}>Followers</span>
    </div>
    <div className={classes.button}>
      <Button className={classes.buttonUnfollow}>LOADING</Button>
    </div>
  </Paper>
);

export default withStyles(styles)(PreLoader);
