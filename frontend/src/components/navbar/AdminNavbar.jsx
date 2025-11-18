import React from "react";
import { Link } from "react-router-dom";
import "./adminNavbar.css";

const AdminNavbar = ({ onLogout }) => {
  const username = localStorage.getItem("name");
  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/admin/dashboard">
            <img src="/a-hospital-logo-for-a-test-lab-web.png" alt="Hospital Logo" className="hospital-logo" />
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/upload">Upload Reports</Link>
          <Link to="/admin/appointments">Appointments</Link>

          <Link to="/admin/about">About Us</Link>
        </div>
        <div className="navbar-user">
          <span>Welcome, Admin {username}</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
