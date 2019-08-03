import React, {useEffect} from 'react';
import './App.scss';
import {connect} from "react-redux";
import {Route, Router, Switch} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import {ActionPayload} from "../shared";
import {GlobalStore} from "../store";
import {MainComponent} from "./main.component";
import {checkIfTokenExist} from "./security/auth.actions";
import Login from "./security/login.component";
import PrivateRoute from "./security/private-route.component";
import "../axious.default-headers";


import {createBrowserHistory} from "history";

export const history = createBrowserHistory();

// https://demos.creative-tim.com/material-dashboard/examples/dashboard.html
const App: React.FC<{isAuthorized: () => void}> = (props) => {
  props.isAuthorized();
  return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/" component={MainComponent}/>
        </Switch>

      </Router>
  );
};
const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalStore, null, ActionPayload<boolean>>) => ({
  isAuthorized: () => dispatch(checkIfTokenExist())
});

export default connect(null, mapDispatchToProps)(App);


