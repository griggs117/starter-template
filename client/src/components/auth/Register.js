import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";

import { SIGNUP_USER } from "../../queries";

import TextFieldGroup from "../common/TextFieldGroup";

// Set initial state to blank fields
const initialState = {
  username: "",
  email: "",
  password: "",
  password2: "",
  errors: {}
};

class Register extends Component {
  // Initialize state with initialState
  state = { ...initialState };

  componentDidMount() {
    // Check to see if user is logged in, if true, push to dashboard
    if (this.props.session.getCurrentUser) {
      this.props.history.push("/");
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

  onSubmit = (e, signupUser) => {
    e.preventDefault();

    // Calls signupUser, sets the returned token to localStorage, refetches queries, clears state and pushes to dashboard
    signupUser()
      .then(async ({ data }) => {
        localStorage.setItem("token", data.signupUser.token);
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
    const { username, email, password, password2, errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your account</p>
              <Mutation
                mutation={SIGNUP_USER}
                variables={{ username, email, password, password2 }}
                errorPolicy="all"
              >
                {(signupUser, { data, loading, error }) => {
                  return (
                    <form
                      noValidate
                      onSubmit={e => this.onSubmit(e, signupUser)}
                    >
                      <TextFieldGroup
                        placeholder="Username"
                        name="username"
                        type=""
                        value={username}
                        onChange={this.onChange}
                        error={errors.username}
                      />
                      <TextFieldGroup
                        placeholder="Email"
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
                      <TextFieldGroup
                        placeholder="Confirm Password"
                        name="password2"
                        type="password"
                        value={password2}
                        onChange={this.onChange}
                        error={errors.password2}
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
    );
  }
}

export default withRouter(Register);
