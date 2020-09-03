import React, { Component } from "react";
import { fetchProfile, isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";

class Profile extends Component {
  state = {
    user: "",
    redirectToSignin: false,
  };

  componentDidMount() {
    fetchProfile(this.props.match.params.userId)
      .then((data) => {
        if (data.error) {
          this.setState({ redirectToSignin: true });
          console.log("ERROR is ", data.error);
        } else {
          this.setState({ user: data });
        }
      })
      .catch((err) => {
        this.setState({ redirectToSignin: true });
        console.log("ERROR is ", err);
      });
  }

  render() {
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to="/signup"></Redirect>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mt-5 mb-5">Profile</h2>
            <p>Hello, {this.state.user.name}</p>
            <p>Email: {this.state.user.email}</p>
            <p>Joined on: {new Date(this.state.user.created).toDateString()}</p>
          </div>
          <div className="col-md-6">
            {isAuthenticated().userRes &&
              isAuthenticated().userRes._id == this.state.user._id && (
                <div className="d-inline-block mt-5">
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/${this.state.user._id}`}
                  >
                    Edit Profile
                  </Link>
                  <button className="btn btn-raised btn-danger">
                    Delete Profile
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
