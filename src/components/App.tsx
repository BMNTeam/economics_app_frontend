import React from 'react';
import './App.scss';
import {Route, Router, Switch} from "react-router";
import {MainComponent} from "./main.component";
import Login from "./security/login.component";
import PrivateRoute from "./security/private-route.component";


import {createBrowserHistory} from "history";

const history = createBrowserHistory();

// https://demos.creative-tim.com/material-dashboard/examples/dashboard.html
const App: React.FC = () => {
  return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/" component={MainComponent}/>
        </Switch>

      </Router>
  );
};

export default App;


