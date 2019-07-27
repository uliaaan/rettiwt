import React from 'react';
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

const Header = ({ logoutUser, history, classes, auth }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const authLinks = (
    <>
      <IconButton
        aria-owns={anchorEl ? 'menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <Link
            to={`/profile/${auth.user && auth.user.id}`}
            onClick={handleClose}
          >
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="#" onClick={() => logoutUser(history)}>
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
        onClick={handleClick}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
      <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <Link to="/login" onClick={handleClose}>
            Login
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register" onClick={handleClose}>
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
          {auth.isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

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
