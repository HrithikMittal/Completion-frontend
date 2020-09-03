import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import AllUsers from "./user/AllUsers";
import EditProfile from "./user/EditProfile";

const MainRouter = () => {
  return (
    <div>
      <Menu></Menu>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/user/:userId" exact component={Profile}></Route>
        <Route path="/allusers" exact component={AllUsers}></Route>
        <Route path="/user/edit/:userId" exact component={EditProfile}></Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
