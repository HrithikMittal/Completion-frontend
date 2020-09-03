import React, { Component } from "react";
import { fetchProfile, update } from "../auth/index";
import { Redirect } from "react-router-dom";

class EditProfile extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    password: "",
    error: "",
    redirectToProfile: false,
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    fetchProfile(userId)
      .then((data) => {
        if (data.error) {
          this.setState({ redirectToSignin: true });
        } else {
          this.setState({ id: data._id, name: data.name, email: data.email });
        }
      })
      .catch((err) => {
        this.setState({ redirectToSignin: true });
      });
  }

  clickSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      const { name, email, password, id } = this.state;
      const user = { name, email, password: password || undefined };
      update(user, id)
        .then((data) => {
          if (data.error) {
            this.setState({ error: data.error });
          } else {
            this.setState({
              error: "",
              email: "",
              password: "",
              name: "",
              redirectToProfile: true,
            });
          }
        })
        .catch((err) => {
          console.log("Error is ", err);
        });
    }
  };

  isValid = () => {
    const { name, email, password } = this.state;
    if (name.length === 0) {
      this.setState({ error: "Name is required" });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: "Email is required" });
      return false;
    }
    if (password.length >= 1 && password <= 5) {
      this.setState({ error: "password is required with length 6" });
      return false;
    }
    return true;
  };

  render() {
    if (this.state.redirectToProfile) {
      return <Redirect to={`/user/${this.state.id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>

        {this.state.error && (
          <div
            className="alert alert-primary"
            style={{ display: this.state.error ? "" : "none" }}
          >
            {this.state.error}
          </div>
        )}
        <form>
          <div className="form-group">
            <lable className="text-muted">Name</lable>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange("name")}
              value={this.state.name}
            ></input>
          </div>
          <div className="form-group">
            <lable className="text-muted">Email</lable>
            <input
              type="email"
              className="form-control"
              onChange={this.handleChange("email")}
              value={this.state.email}
            ></input>
          </div>
          <div className="form-group">
            <lable className="text-muted">Password</lable>
            <input
              type="password"
              className="form-control"
              onChange={this.handleChange("password")}
              value={this.state.password}
            ></input>
          </div>
          <button
            className="btn btn-raised btn-primary"
            onClick={this.clickSubmit}
          >
            Update Profile
          </button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
