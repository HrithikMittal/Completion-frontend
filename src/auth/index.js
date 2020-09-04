export const login = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    return response.json();
  });
};

export const signup = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    return response.json();
  });
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const authenticate = (jwt, next) => {
  if (typeof window != undefined) {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const fetchProfile = (userId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/getUser/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + isAuthenticated().token,
    },
  }).then((res) => {
    return res.json();
  });
};

export const getAllUsers = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/allUsers`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
  }).then((response) => {
    return response.json();
  });
};

export const signout = (next) => {
  const token = isAuthenticated().token;
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return fetch(`${process.env.REACT_APP_API_URL}/user/signout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then()
    .catch((err) => {
      console.log("Error", err);
    });
};

export const remove = (userId) => {
  const token = isAuthenticated().token;
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  return fetch(`${process.env.REACT_APP_API_URL}/user/delUser/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
};

export const update = (userId, user) => {
  const token = isAuthenticated().token;
  return fetch(`${process.env.REACT_APP_API_URL}/user/updateUser/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  }).then((response) => {
    return response.json();
  });
};

export const follow = (userId, followId) => {
  const token = isAuthenticated().token;
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, followId }),
  }).then((response) => {
    return response.json();
  });
};

export const unfollow = (userId, followId) => {
  const token = isAuthenticated().token;
  return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, followId }),
  }).then((response) => {
    return response.json();
  });
};
