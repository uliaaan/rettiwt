import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../Common/TextFieldGroup';
import Btn from '../Common/Btn';

const Register = ({ auth, history, errors, registerUser }) => {
  const [form, setValues] = React.useState({
    login: '',
    email: '',
    password: '',
    password2: ''
  });

  React.useEffect(() => {
    if (auth.isAuthenticated) history.push('/');
  }, [auth.isAuthenticated, errors, history]);

  const onChange = e => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    registerUser(form, history);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <form onSubmit={onSubmit}>
        <TextFieldGroup
          name="login"
          value={form.login}
          onChange={onChange}
          error={errors.login}
          label="Login"
        />
        <TextFieldGroup
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          error={errors.email}
          label="Email"
        />
        <TextFieldGroup
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          error={errors.password}
          label="Password"
        />
        <TextFieldGroup
          name="password2"
          type="password"
          value={form.password2}
          onChange={onChange}
          error={errors.password2}
          label="Repeat password"
        />
        <Btn variant="outlined" type="submit" value="Submit" />
      </form>
    </Paper>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
