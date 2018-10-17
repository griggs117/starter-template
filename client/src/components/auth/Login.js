import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";

import { SIGNIN_USER } from "../../queries";

import TextFieldGroup from "../common/TextFieldGroup";

// Set initial state to blank fields
const initialState = {
  email: "",
  password: "",
  errors: {}
};

class Login extends Component {
  // Initialize state with initialState
  state = { ...initialState };

  componentDidMount() {
    // Check to see if user is logged in, if true, push to dashboard
    if (this.props.session.getCurrentUser) {
      this.props.history.push("/dashboard");
    }
  }

  clearState = () => {
    // Set state back to initialState
    this.setState({ ...initialState });
  };

  onChange = e => {
    // Handles change on stated component
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e, signinUser) => {
    e.preventDefault();

    // Calls signinUser, sets the returned token to localStorage, refetches queries, clears state and pushes to dashboard
    signinUser()
      .then(async ({ data }) => {
        localStorage.setItem("token", data.signinUser.token);
        await this.props.refetch();
        this.clearState();
        this.props.history.push("/dashboard");
      })
      // Validation errors are returned in this promise - UserInputErrors are returned as an object inside errors.graphQLErrors[0].extentions.exception
      .catch(errors => {
        const { exception } = errors.graphQLErrors[0].extensions;
        // Set the state with the new errors object that was returned
        this.setState({ errors: exception });
      });
  };

  render() {
    const { errors, email, password } = this.state;

    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your account</p>
                <Mutation
                  mutation={SIGNIN_USER}
                  variables={{ email, password }}
                >
                  {(signinUser, { data, loading, error }) => {
                    return (
                      <form onSubmit={e => this.onSubmit(e, signinUser)}>
                        <TextFieldGroup
                          placeholder="Email Address"
                          name="email"
                          type="email"
                          value={email}
                          onChange={this.onChange}
                          error={errors.email}
                        />
                        <TextFieldGroup
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={this.onChange}
                          error={errors.password}
                        />
                        <input
                          type="submit"
                          className="btn btn-info btn-block mt-4"
                        />
                      </form>
                    );
                  }}
                </Mutation>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
