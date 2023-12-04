const setToLocalStorage = ({ authToken, email, userId }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("authUserId", JSON.stringify(userId));
};

const getFromLocalStorage = key => {
  try {
    const value = localStorage.getItem(key);

    return isPresent(value) ? JSON.parse(value) : null;
  } catch (error) {
    logger.error(error);

    return null;
  }
};

const isPresent = value => {
  value !== "";
};

export { setToLocalStorage, getFromLocalStorage };
