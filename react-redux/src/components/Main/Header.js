import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MoreIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { logoutUser } from '../../actions/authActions';
import Search from '../Search/Form';

const styles = {
  root: {
    flexGrow: 1
  },
  menu: {
    backgroundColor: '#33ab9f'
  },
  logo: {
    color: 'white',
    fontSize: 30,
    fontWeight: 500
  },
  space: {
    justifyContent: 'space-between'
  }
};

class Header extends Component {
  state = {
    anchorEl: null
  };

  onLogoutClick = () => {
    this.handleClose();
    this.props.logoutUser(this.props.history);
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { classes } = this.props;
    const { anchorEl } = this.state;

    const authLinks = (
      <>
        <IconButton
          aria-owns={anchorEl ? 'menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>
            <Link to={`/profile/${user && user.id}`} onClick={this.handleClose}>
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="#" onClick={this.onLogoutClick.bind(this)}>
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </>
    );

    const guestLinks = (
      <>
        <IconButton
          aria-owns={anchorEl ? 'menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>
            <Link to="/login" onClick={this.handleClose}>
              Login
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/register" onClick={this.handleClose}>
              Register
            </Link>
          </MenuItem>
        </Menu>
      </>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.menu}>
          <Toolbar className={classes.space}>
            <Link to="/" className={classes.logo}>
              RETTIWT
            </Link>
            <Search />
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(withStyles(styles)(Header)));
