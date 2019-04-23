import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { registerUser } from './actionCreators';

const validate = (values) => {
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

const renderField = ({
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

const Register = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  dispatchNewUser,
}) => {
  const options = [
    'None a.k.a. I eat anything and everything',
    'Vegan',
    'Vegetarian',
    'GlutenFree',
  ];

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

    console.log({ newUser });

    dispatchNewUser(newUser);
  }

  return (
    <div className="simple-card">
      <h1>Sign Up</h1>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="username"
          type="text"
          component={renderField}
          label="Username"
        />
        <Field
          name="firstName"
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name="lastName"
          type="text"
          component={renderField}
          label="Last Name"
        />
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <Field
          name="interests"
          type="text"
          component={renderField}
          label="Interests"
        />
        <FormControl style={{ marginTop: '35px', marginBottom: '20px' }}>
          <InputLabel style={{ marginTop: '-40px' }}>
            Diet Restrictions
          </InputLabel>
          <Field
            style={{ minHeight: '30px', fontSize: '105%' }}
            name="dietRestrictions"
            component="select"
          >
            <option> Select </option>
            {options.map((i, j) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Field>
          {/* <FormHelperText>Diet Restrictions</FormHelperText> */}
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
};

Register.defaultProps = {
  dispatchNewUser: () => {},
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
