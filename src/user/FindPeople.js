import React, { Component } from "react";
import { findPeople, isAuthenticated, follow } from "../auth";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

class FindPeople extends Component {
  state = { users: [], error: "", open: false };

  componentDidMount() {
    const userId = isAuthenticated().userRes._id;
    findPeople(userId)
      .then((data) => {
        if (data.error) {
        }
        this.setState({ users: data });
      })
      .catch((err) => {
        console.log(("error", err));
      });
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().userRes._id;
    follow(userId, user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(i, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}`,
        });
      }
    });
  };

  renderUsers = (users) => {
    return (
      <div className="row">
        {users.map((user, i) => {
          const url = `/user/${user._id}`;
          var photoUrl = user._id
            ? `${process.env.REACT_APP_API_URL}/user/photo/${
                user._id
              }?${new Date().getTime()}`
            : DefaultProfile;

          return (
            <div className="card col-md-4" key={user._id}>
              <img
                className="card-img-top"
                src={photoUrl}
                alt={user.name}
                onError={(i) => (i.target.src = `${DefaultProfile}`)}
                style={{ width: "100%", height: "12vw", objectFit: "hover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>

                <p>{user.about}</p>
                <Link to={url} className="btn btn-primary btn-raised btn-small">
                  View Profile
                </Link>
                <button
                  onClick={() => this.clickFollow(user, i)}
                  className="btn btn-raised btn-info float-right btn-sm"
                >
                  Follow
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">find People</h2>
        {this.state.open && (
          <div>
            <p>{this.state.followMessage}</p>
          </div>
        )}
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default FindPeople;
