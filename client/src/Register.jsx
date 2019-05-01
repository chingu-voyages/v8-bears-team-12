import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useReactRouter from 'use-react-router';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { registerUser } from './actionCreators';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

const RenderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="formText">
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Input {...input} type={type} className="form-input" />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </FormControl>
  </div>
);

RenderField.propTypes = {
  input: PropTypes.shape({}),
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({}),
};

RenderField.defaultProps = {
  input: {},
  label: '',
  type: '',
  meta: {},
};

const Register = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  dispatchNewUser,
}) => {
  const options = [
    'None - I eat anything & everything!',
    'Vegan',
    'Vegetarian',
    'GlutenFree',
  ];
  const { history } = useReactRouter();

  function onSubmit(values) {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      interests,
      dietRestrictions,
    } = values;

    // create new user
    const newUser = {
      name: username,
      firstName,
      lastName,
      email,
      password,
      interests: interests && interests.split(',').splice(0, 5),
      dietRestrictions,
    };

    dispatchNewUser(newUser)
    .then(history.push('/'))
    .catch(history.push('/login'));
  }

  return (
    <div className="simple-card">
      <Typography variant="h4">Sign Up</Typography>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="username"
          type="text"
          component={RenderField}
          label="Username"
        />
        <Field
          name="firstName"
          type="text"
          component={RenderField}
          label="First Name"
        />
        <Field
          name="lastName"
          type="text"
          component={RenderField}
          label="Last Name"
        />
        <Field
          name="email"
          type="email"
          component={RenderField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={RenderField}
          label="Password"
        />
        <Field
          name="interests"
          type="text"
          component={RenderField}
          label="Interests"
        />

        <FormControl
          style={{ marginTop: '35px', marginBottom: '20px', width: '100%' }}
        >
          <InputLabel style={{ marginTop: '-40px' }}>
            Diet Restrictions
          </InputLabel>
          <Field
            style={{ minHeight: '30px', fontSize: '105%' }}
            name="dietRestrictions"
            component="select"
          >
            <option> Select </option>
            {options.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Field>
        </FormControl>
        <br />
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
            style={{ margin: '5px' }}
          >
            Submit
          </Button>
          <Button
            type="Button"
            variant="contained"
            color="primary"
            style={{ margin: '5px' }}
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </Button>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  dispatchNewUser: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
};

Register.defaultProps = {
  dispatchNewUser: () => {},
  handleSubmit: () => {},
  pristine: true,
  submitting: false,
  reset: () => {},
};
const mapDispatchToProps = {
  dispatchNewUser: registerUser,
};

export default reduxForm({
  form: 'RegisterForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(
  connect(
    null,
    mapDispatchToProps,
  )(Register),
);
