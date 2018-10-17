import React from "react";
import { Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";

// If user is logged in, render passed Component, otherwise push to /
const PrivateRoute = ({ component: Component, props }) => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      return data.getCurrentUser ? (
        <Component {...props} refetch={refetch} session={data} />
      ) : (
        <Redirect to="/" />
      );
    }}
  </Query>
);

export default PrivateRoute;
