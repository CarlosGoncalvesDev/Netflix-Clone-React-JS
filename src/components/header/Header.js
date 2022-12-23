import React from "react";
import "./Header.css";

// ----------------------------------------------------------------------
//                             Logo
// ----------------------------------------------------------------------
export default ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img src="#"></img>
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src="#"></img>
        </a>
      </div>
    </header>
  );
};
