import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  filed: {
    width: '100%',
    marginBottom: 5
  },
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
  notchedOutline: {}
};

const TextFieldGroup = ({
  name,
  value,
  label,
  error,
  type,
  onChange,
  disabled,
  classes
}) => {
  return (
    <div>
      <TextField
        error={error ? true : false}
        id={name}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        helperText={error ? error : null}
        className={classes.filed}
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
      />
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default withStyles(styles)(TextFieldGroup);
