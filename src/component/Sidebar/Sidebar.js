import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="header">TestSystem</div>
        <div className="links">
          <NavLink to="/board">
            <div className="link">Board</div>
          </NavLink>
          <NavLink to="/account">
            <div className="link">Account</div>
          </NavLink>
          <NavLink to="/my-tests">
            <div className="link">My Tests</div>
          </NavLink>
          <NavLink to="/">
            <div className="link">Create Test</div>
          </NavLink>
        </div>
      </div>
    );
  }
}
