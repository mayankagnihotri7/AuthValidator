const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,3}$/i;

export const emailValidator = email => {
  if (!email) {
    return "Email is required.";
  } else if (!new RegExp(regex).test(email)) {
    return "Email format is wrong";
  }

  return "";
};

export const passwordValidator = password => {
  if (!password) {
    return "Please enter password";
  }

  return "";
};

export const confirmPasswordValidator = (confirmPassword, password) => {
  const trimmedPassword = password.trim();

  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword !== trimmedPassword) {
    return "Passwords do not match";
  } else if (confirmPassword.length < 6) {
    return "Confirm password must have a minimum 6 characters";
  }

  return "";
};
