import React from "react";
import { withRouter, Link } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";

// Clears token from localStorage, resets the Apollo store and pushes to /
const handleSignout = (client, history) => {
  localStorage.setItem("token", "");
  client.resetStore();
  history.push("/");
};

const Logout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <Link
          className="dropdown-item"
          to="/"
          onClick={() => handleSignout(client, history)}
        >
          Logout
        </Link>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Logout);
