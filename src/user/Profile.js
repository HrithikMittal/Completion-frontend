import React, { Component } from "react";
import { fetchProfile, isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";
import DeleteUser from "./DeleteUser";

class Profile extends Component {
  state = {
    user: "",
    redirectToSignin: false,
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    fetchProfile(userId)
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

  componentWillReceiveProps(props) {
    const userId = this.props.match.params.userId;
    fetchProfile(userId)
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
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              className="card-img-top"
              src={DefaultProfile}
              alt={this.state.user.name}
              style={{ width: "100%", height: "15vw", objectFit: "hover" }}
            />
          </div>
          <div className="col-md-6">
            <div className="lead mt-5 ml-5">
              <p>Hello, {this.state.user.name}</p>
              <p>Email: {this.state.user.email}</p>
              <p>
                Joined on: {new Date(this.state.user.created).toDateString()}
              </p>
            </div>
            {isAuthenticated().userRes &&
              isAuthenticated().userRes._id === this.state.user._id && (
                <div className="d-inline-block mt-5">
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/${this.state.user._id}`}
                  >
                    Edit Profile
                  </Link>
                  <DeleteUser userId={this.state.user._id} />
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
