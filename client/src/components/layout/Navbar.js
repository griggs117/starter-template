import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../auth/Logout";

const Navbar = ({ session }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Tes
          <span className="text-danger">T</span>
          <span className="text-muted">emplate</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          {session && session.getCurrentUser ? <NavLinks /> : null}
          {session && session.getCurrentUser ? (
            <AuthLinks session={session} />
          ) : (
            <GuestLinks />
          )}
        </div>
      </div>
    </nav>
  );
};

const AuthLinks = ({ session }) => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="/profile"
        id="navbarAccount"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {session.getCurrentUser.username}
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarAccount">
        <NavLink className="dropdown-item disabled" to="/profile" disabled>
          Profile
        </NavLink>
        <NavLink className="dropdown-item disabled" to="/settings">
          Settings
        </NavLink>
        <div className="dropdown-divider" />
        <Logout />
      </div>
    </li>
  </ul>
);

const GuestLinks = () => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <NavLink className="nav-link" to="/register">
        Sign Up
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
    </li>
  </ul>
);

const NavLinks = () => (
  <ul className="navbar-nav mr-auto">
    <li className="nav-item">
      <NavLink className="nav-link" to="/dashboard">
        Dashboard
      </NavLink>
    </li>
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="/clients"
        id="navbarAccount"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Clients
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarAccount">
        <NavLink className="dropdown-item" to="/clients">
          Client List
        </NavLink>
        <div className="dropdown-divider" />
        <NavLink className="dropdown-item" to="/clients/new">
          Add New Client
        </NavLink>
      </div>
    </li>
  </ul>
);

export default Navbar;
