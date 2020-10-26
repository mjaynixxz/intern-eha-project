import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Fragment>
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-gamepad"></i> eHA-Game-TV</Link>
        </h1>
        <ul>
         
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
        </Fragment>
    )
}

export default Navbar;
