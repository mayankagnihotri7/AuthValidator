import React, { useEffect, useState } from "react";

import authApi from "apis/auth";
import SignupForm from "components/Authentication/Form/Signup";
import PageLoader from "components/PageLoader";
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
} from "constants/formValidations";

const Signup = ({ history }) => {
  const initialFormValues = {
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filteredValues = Object.values(formErrors).filter(val => val !== "");

    if (filteredValues.length === 0) {
      logger.log("No Errors!!!");
    }
  }, [formErrors]);

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }));

    const errors = validate({ ...formValues, [name]: value });
    setFormErrors(errors);
  };

  const validate = values => {
    const errors = {};

    const validEmail = emailValidator(values.email);
    const validPassword = passwordValidator(values.password);
    const validPasswordConfirmation = confirmPasswordValidator(
      values.passwordConfirmation,
      formValues.password
    );

    errors.email = validEmail;
    errors.password = validPassword;
    errors.passwordConfirmation = validPasswordConfirmation;

    return errors;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      event.preventDefault();
      setFormErrors(validate(formValues));
      const filteredValues = Object.values(formErrors).filter(
        val => val !== ""
      );

      if (filteredValues.length === 0) {
        await authApi.signup({
          email: formValues.email,
          password: formValues.password,
          password_confirmation: formValues.passwordConfirmation,
        });
        history.push("/login");
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <SignupForm
      formErrors={formErrors}
      formValues={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default Signup;
