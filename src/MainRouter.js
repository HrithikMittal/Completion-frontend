import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./core/Signup";
import Signin from "./core/Signin";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
