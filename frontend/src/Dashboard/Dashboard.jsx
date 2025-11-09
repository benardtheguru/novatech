import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "User" };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <h2 className="logo">MedLab Pro</h2>
          <span className="tagline">Advanced Diagnostic Laboratory</span>
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Test Results</li>
          <li>Appointments</li>
          <li>Reports</li>
          <li>Profile</li>
        </ul>
        <div className="nav-right">
          <span className="status online">● Online</span>
          <span className="user-name">{user.name}</span>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h3>Welcome to MedLab Pro</h3>
        <p>
          Your trusted partner in advanced diagnostic testing and personalized healthcare solutions.
        </p>
        <div className="welcome-buttons">
          <button className="btn-view">View Recent Results</button>
          <button className="btn-schedule">Schedule Test</button>
        </div>
      </section>

      {/* Stats Section */}
      <div className="stats">
        <div className="card completed">
          <h4>24</h4>
          <p>Completed Tests</p>
        </div>
        <div className="card upcoming">
          <h4>3</h4>
          <p>Upcoming Appointments</p>
        </div>
        <div className="card pending">
          <h4>2</h4>
          <p>Pending Reviews</p>
        </div>
        <div className="card health">
          <h4>98%</h4>
          <p>Health Score</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="recent-tests">
          <h4>Recent Test Results</h4>
          <ul>
            <li>
              <span>Comprehensive Metabolic Panel</span>
              <span className="tag attention">Attention Required</span>
              <span className="date">October 12, 2024</span>
            </li>
            <li>
              <span>Complete Blood Count</span>
              <span className="tag normal">Normal</span>
              <span className="date">September 29, 2024</span>
            </li>
            <li>
              <span>Thyroid Function Test</span>
              <span className="tag normal">Normal</span>
              <span className="date">September 15, 2024</span>
            </li>
          </ul>
        </div>

        <div className="side-panels">
          <div className="upcoming">
            <h4>Upcoming Appointments</h4>
            <ul>
              <li>Follow-up Consultation — <span>Oct 11, 2024 • 2:30 PM</span></li>
              <li>Lipid Panel Retest — <span>Nov 2, 2024 • 9:00 AM</span></li>
            </ul>
          </div>

          <div className="insights">
            <h4>Health Insights</h4>
            <p className="success">✅ Great Job! Your glucose levels have improved by 15% since last test.</p>
            <p className="warning">⚠️ Action Needed: Cholesterol slightly above optimal range.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
