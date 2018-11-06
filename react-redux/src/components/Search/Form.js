import React, { Component } from 'react';
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
      marginLeft: theme.spacing.unit,
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
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120
    }
  }
});

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchData = {
      text: this.state.text.toLowerCase()
    };
    this.props.searchUser(searchData, this.props.history);
    this.setState({ text: '' });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={classes.search}>
          <InputBase
            placeholder="Search users"
            autoComplete="off"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            value={this.state.text}
            onChange={this.handleChange}
          />
          <IconButton
            className={classes.searchIcon}
            onClick={this.handleSubmit}
            aria-label="Search"
            type="submit"
          >
            <SearchIcon />
          </IconButton>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  searchUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchUser }
)(withRouter(withStyles(styles)(Form)));
