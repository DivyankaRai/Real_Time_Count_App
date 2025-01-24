import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/admin">Admin Dashboard</Link>
        </li>
        <li>
          <Link to="/player">Player Dashboard</Link>
        </li>
        <li>
          <Link to="/rank">Rankings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
