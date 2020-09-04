import React, { Component } from "react";
import { follow, unfollow } from "../auth/index";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

  render() {
    return (
      <div className="d-inline-block mt-5">
        {!this.props.following ? (
          <button
            onClick={this.followClick}
            className="btn btn-raised btn-success"
          >
            Follow
          </button>
        ) : (
          <button
            onClick={this.unfollowClick}
            className="btn btn-raised btn-warning"
          >
            Unfollow
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
