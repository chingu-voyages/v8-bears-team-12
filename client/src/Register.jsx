import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  if (!values.interests) {
    errors.interests = 'Required';
  }
  return errors;
};

const renderField = ({
  input, label, type, meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const Register = ({
  handleSubmit, pristine, reset, submitting, dispatchNewUser,
}) => {
  const options = [
    'None a.k.a. I eat anything and everything',
    'Vegan',
    'Vegetarian',
    'GlutenFree',
  ];

  function onSubmit(values) {
    const {
      username, firstName, lastName, email, password, interests, dietRestrictions,
    } = values;

    // create new user
    const newUser = {
      name: username,
      firstName,
      lastName,
      email,
      password,
      interests: interests.split(',').splice(0, 5),
      dietRestrictions,
    };

    console.log({ newUser });

    dispatchNewUser(newUser);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Create your account</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="username" type="text" component={renderField} label="Username" />
        <Field name="firstName" type="text" component={renderField} label="First Name" />
        <Field name="lastName" type="text" component={renderField} label="Last Name" />
        <Field name="email" type="email" component={renderField} label="Email" />
        <Field name="password" type="password" component={renderField} label="Password" />
        <Field name="interests" type="text" component={renderField} label="Interests" />
        <label>Diet Restrictions</label>
        <div>
          <Field name="dietRestrictions" component="select">
            <option />
            {options.map((i, j) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Field>
        </div>
        <br />
        <div>
          <button type="submit" disabled={submitting} style={{ margin: '5px' }}>
            Submit
          </button>
          <button
            type="button"
            style={{ margin: '5px' }}
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
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
