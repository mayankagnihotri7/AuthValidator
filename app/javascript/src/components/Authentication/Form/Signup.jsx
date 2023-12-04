import React from "react";

import { Link } from "react-router-dom";

import Button from "components/Button";
import Input from "components/Input";

import CheckList from "./PasswordChecklist";

const Signup = ({
  handleSubmit,
  loading,
  handleChange,
  formValues,
  formErrors,
}) => (
  <div
    className="flex items-center justify-center min-h-screen px-4
    py-12 sm:px-6 lg:px-8 bg-gray-50 "
  >
    <div className="w-full max-w-md">
      <h2
        className="mt-6 text-3xl font-extrabold leading-9
        text-center text-gray-700"
      >
        Sign Up
      </h2>
      <div className="text-center">
        <Link
          to="/"
          className="mt-2 text-sm font-medium text-center
            text-bb-purple transition duration-150 ease-in-out
            focus:outline-none focus:underline"
        >
          Or Login Now
        </Link>
      </div>
      <form className="mt-8" onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          placeholder="oliver@example.com"
          type="email"
          value={formValues.email}
          onChange={handleChange}
        />
        {formErrors?.email && (
          <span className="text-sm text-red-600">{formErrors["email"]}</span>
        )}
        <Input
          label="Password"
          name="password"
          placeholder="********"
          type="password"
          onChange={handleChange}
        />
        {formValues.password.length >= 1 && (
          <CheckList value={formValues.password} />
        )}
        <Input
          label="Password Confirmation"
          name="passwordConfirmation"
          placeholder="********"
          type="password"
          onChange={handleChange}
        />
        {formErrors?.passwordConfirmation && (
          <span className="text-sm text-red-600">
            {formErrors["passwordConfirmation"]}
          </span>
        )}
        <Button buttonText="Register" loading={loading} type="submit" />
      </form>
    </div>
  </div>
);
export default Signup;
