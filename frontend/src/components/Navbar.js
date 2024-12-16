import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
        <li className="navbar-item"><Link to="/tasks" className="navbar-link">Task List</Link></li>
        <li className="navbar-item"><Link to="/tasks/create" className="navbar-link">Create Task</Link></li>
        <li className="navbar-item"><Link to="/login" className="navbar-link">Login</Link></li>
        <li className="navbar-item"><Link to="/register" className="navbar-link">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
