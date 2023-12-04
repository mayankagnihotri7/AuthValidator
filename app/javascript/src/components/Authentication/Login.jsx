import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/Login";
import PageLoader from "components/PageLoader";
import { setToLocalStorage } from "utils/storage";

const Login = () => {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const { email, password } = formValues;
      const response = await authApi.login({ email, password });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: email.toLowerCase(),
        userId: response.data.id,
      });
      setAuthHeaders();
      setLoading(false);
      window.location.href = "/";
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
    <LoginForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default Login;
