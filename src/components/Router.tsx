import React from "react";
import { Route, Router as DOMRouter, Redirect } from "react-router-dom";
import { Home } from "../pages/Home";
import { routerStore } from "../store/RouterStore";
import { AnimatedSwitch } from 'react-router-transition';
import qs from "querystring";

const parse = (path: string) => {
  if (!path) return {};
  path = path.replace("?", "");
  return qs.parse(path);
}

export const Router = () => {

  return (
    <DOMRouter history={routerStore.history}>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route exact path="/" render={() => <Home />} />
        <Redirect to="/" />
      </AnimatedSwitch>
    </DOMRouter>
  )
}