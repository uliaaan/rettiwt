import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  btnBlock: {
    width: '100%',
    textAlign: 'center',
    marginTop: 30
  },
  btn: {
    borderColor: '#009688',
    color: '#009688',
    '&:hover': {
      backgroundColor: '#009688',
      color: '#fff'
    }
  }
};

const Btn = ({ classes, value, type, variant }) => {
  return (
    <div className={classes.btnBlock}>
      <Button className={classes.btn} type={type} variant={variant}>
        {value}
      </Button>
    </div>
  );
};

export default withStyles(styles)(Btn);
