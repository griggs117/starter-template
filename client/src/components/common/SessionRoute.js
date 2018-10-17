import React from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";

// Wraps component with session data and returns
const SessionRoute = ({ component: Component, props }) => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

export default SessionRoute;
