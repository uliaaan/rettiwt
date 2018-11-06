import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  load: {
    width: '100%',
    textAlign: 'center',
    marginTop: 30
  },
  loadIcon: {
    color: '#009688'
  }
};

const Process = ({ classes }) => (
  <div className={classes.load}>
    <CircularProgress className={classes.loadIcon} />
  </div>
);

export default withStyles(styles)(Process);
