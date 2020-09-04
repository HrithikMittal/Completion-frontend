import React, { Component } from "react";
import { fetchProfile, update } from "../auth/index";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

class EditProfile extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    password: "",
    error: "",
    redirectToProfile: false,
    loading: false,
    fileSize: 0,
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  init(userId) {
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

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const { id } = this.state;

      update(id, this.userData)
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
    const { name, email, password, fileSize } = this.state;
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
    if (fileSize > 100000) {
      this.setState({ error: "File size should be less than 100kb/1mb" });
      return false;
    }
    return true;
  };

  render() {
    if (this.state.redirectToProfile) {
      return <Redirect to={`/user/${this.state.id}`} />;
    }

    var photoUrl = this.state.id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          this.state.id
        }?${new Date().getTime()}`
      : DefaultProfile;

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

        {this.state.loading && (
          <div
            className="alert alert-primary"
            style={{ display: this.state.error ? "" : "none" }}
          >
            <p>Loading</p>
          </div>
        )}
        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={(i) => (i.target.src = `${DefaultProfile}`)}
          alt={this.state.name}
        />

        <form>
          <div className="form-group">
            <lable className="text-muted">Profile Photo</lable>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={this.handleChange("photo")}
            ></input>
          </div>
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
