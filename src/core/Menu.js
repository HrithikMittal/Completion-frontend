import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return fetch("http://localhost:4040/user/signout", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then()
    .catch((err) => {
      console.log("Error", err);
    });
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/signup")}
            to="/signup"
          >
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/signin")}
            to="/signin"
          >
            Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link disabled"
            style={isActive(history, "/signout")}
            to=""
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
