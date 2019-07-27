import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../Common/TextFieldGroup';
import Btn from '../Common/Btn';

const Login = ({ loginUser, auth, history, errors }) => {
  const [form, setValues] = React.useState({
    email: '',
    password: ''
  });

  React.useEffect(() => {
    if (auth.isAuthenticated) history.push('/');
  }, [auth.isAuthenticated, errors, history]);

  const onChange = e => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    loginUser(form);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <form onSubmit={onSubmit}>
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
        <Btn variant="outlined" type="submit" value="Submit" />
      </form>
    </Paper>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
