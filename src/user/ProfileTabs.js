import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

class ProfileTabs extends Component {
  render() {
    const { following, followers } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-primary">Followers</h3>
            <hr />
            {followers.map((person, i) => {
              return (
                <div key={i}>
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        className="float-left mr-2"
                        height="30px"
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                        width="30px"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        alt={person.name}
                        onError={(i) => (i.target.src = `${DefaultProfile}`)}
                      />
                      <div>
                        <p className="lead">{person.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <h3 className="text-primary">Following</h3>
            <hr />
            {following.map((person, i) => {
              return (
                <div key={i}>
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        className="float-left mr-2"
                        height="30px"
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                        width="30px"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        alt={person.name}
                        onError={(i) => (i.target.src = `${DefaultProfile}`)}
                      />
                      <div>
                        <p className="lead">{person.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <h3 className="text-primary">Posts</h3>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
