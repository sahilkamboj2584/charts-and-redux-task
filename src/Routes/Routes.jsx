import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "../Component/Home/Home";
import { Provider } from "react-redux";
import store from "../Component/Redux/Store";
import GraphComp from "../Component/Graph/GraphComp";
import ContributorComp from "../Component/Graph/ContributorComp";

function Routes() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Route exact path="/" component={Home} />
          <Route exact path="/graph/:owner/:repo" component={GraphComp} />
          <Route
            exact
            path="/contributor/:owner/:repo"
            component={ContributorComp}
          />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default Routes;
