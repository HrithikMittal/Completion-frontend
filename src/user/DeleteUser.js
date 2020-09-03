import React, { Component } from "react";
import { remove } from "../auth/index";
import { Redirect } from "react-router-dom";

class DeleteUser extends Component {
  state = { redirect: false };
  deleteAccount = () => {
    const userId = this.props.userId;
    remove(userId)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          window.alert("Account Delete Successfully!");
        }
      })
      .catch((err) => {
        console.log("ERROR is ", err);
      });
  };

  deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (answer) {
      this.deleteAccount();
      this.setState({ redirect: true });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <button
        onClick={this.deleteConfirmed}
        className="btn btn-raised btn-danger"
      >
        Delete Profile
      </button>
    );
  }
}

export default DeleteUser;
