import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import PrivateRoute from "./components/common/PrivateRoute";
import SessionRoute from "./components/common/SessionRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

// Connect to GraphQL backend through Apollo
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <SessionRoute component={Navbar} />
            <Switch>
              <SessionRoute exact path="/" component={Landing} />
            </Switch>
            <div className="container">
              <Switch>
                <SessionRoute exact path="/register" component={Register} />
              </Switch>
              <Switch>
                <SessionRoute exact path="/login" component={Login} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
