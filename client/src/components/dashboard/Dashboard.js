import React, { Component } from "react";
import { Mutation } from "react-apollo";

import { GET_CURRENT_USER, DELETE_USER } from "../../queries";

export class Dashboard extends Component {
  handleDelete = deleteUser => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      deleteUser().then(({ data }) => {});
    }
  };

  render() {
    const { username, id } = this.props.session.getCurrentUser;

    let dashboardContent;
    dashboardContent = (
      <div>
        <p className="lead text-muted">Welcome {username}</p>
        <div style={{ marginBottom: "60px" }} />
        <Mutation
          mutation={DELETE_USER}
          variables={{ id }}
          refetchQueries={() => [{ query: GET_CURRENT_USER }]}
        >
          {(deleteUser, { data, loading, error }) => {
            return (
              <button
                onClick={() => this.handleDelete(deleteUser)}
                className="btn btn-danger"
              >
                Delete My Account
              </button>
            );
          }}
        </Mutation>
      </div>
    );

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
