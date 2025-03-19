import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, RefreshCw } from 'lucide-react';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-title">
        <Link className="nav-icon" />
        Linked List Visualizer
      </div>
      <div className="nav-links">
        <NavLink
          to="/singly"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Singly Linked List
        </NavLink>
        <NavLink
          to="/circular"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <RefreshCw size={16} className="nav-icon" />
          Circular Linked List
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation; 