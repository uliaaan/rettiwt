import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { searchUser } from '../../actions/authActions';

const styles = theme => ({
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    marginLeft: 10,
    color: '#fff'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1) * 2,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120
    }
  }
});

const Form = ({ classes, history, searchUser }) => {
  const [text, setText] = React.useState('');

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    searchUser({ text }, history);
    setText('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.search}>
        <InputBase
          placeholder="Search users"
          autoComplete="off"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          value={text}
          onChange={handleChange}
        />
        <IconButton
          className={classes.searchIcon}
          onClick={handleSubmit}
          aria-label="Search"
          type="submit"
        >
          <SearchIcon />
        </IconButton>
      </form>
    </>
  );
};

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  searchUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchUser }
)(withRouter(withStyles(styles)(Form)));
