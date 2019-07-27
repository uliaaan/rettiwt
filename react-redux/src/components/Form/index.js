import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { addPost } from '../../actions/postActions';

const styles = {
  cssLabel: {
    '&$cssFocused': {
      color: '#33ab9f'
    }
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#33ab9f'
    }
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#33ab9f'
    }
  },
  notchedOutline: {},
  button: {
    width: '100%',
    color: '#fff',
    backgroundColor: '#33ab9f',
    '&:hover': {
      backgroundColor: '#009688'
    }
  },
  text: {
    marginTop: 0,
    width: '100%'
  },
  paper: {
    padding: 8,
    margin: '10px 0'
  }
};

const Form = ({ addPost, classes }) => {
  const [text, setText] = React.useState('');

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addPost({ text });
    setText('');
  };

  return (
    <Paper className={classes.paper}>
      <TextField
        id="standard-multiline-flexible"
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            underline: classes.cssUnderline
          }
        }}
        autoComplete="off"
        label="What's new? Young fella"
        multiline
        rowsMax="4"
        value={text}
        onChange={handleChange}
        className={classes.text}
        margin="normal"
      />
      <Button className={classes.button} onClick={handleSubmit}>
        Send
      </Button>
    </Paper>
  );
};

Form.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(withStyles(styles)(Form));
