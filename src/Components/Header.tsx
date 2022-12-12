import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";

export default class Header extends PureComponent {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p data-testid='header'>RUBICON MOVIE APP</p>
          <div className="Header-links-container">
            <NavLink
            data-testid='link-to-movies'
              to={"/movies"}
              className={({ isActive }) =>
                isActive ? "Header-link" : "Header-link-active"
              }
            >
              Movies
            </NavLink>
            <NavLink
              to={"/tv"}
              data-testid='link-to-tv'
              className={({ isActive }) =>
                isActive ? "Header-link" : "Header-link-active"
              }
            >
              TV Shows
            </NavLink>
          </div>
        </header>
      </div>
    );
  }
}
