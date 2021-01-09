import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import VerifyPage from "views/VerifyPage/VerifyPage.js";
import AddTxnPage from "views/AddTxnPage/AddTxnPage.js";
import InvalidPage from "views/ProfilePage/InvalidPage.js";

var hist = createBrowserHistory();

function App() {
  return (
    <div>
      <Router history={hist}>
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/org/:uen/addtxn' component={AddTxnPage} />
          <Route path='/org/:uen' component={ProfilePage} />
          <Route path='/login-page' component={LoginPage} />
          <Route path='/component' component={Components} />
          <Route path='/verify' component={VerifyPage} />
          <Route path='/invalid-uen' component={InvalidPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
