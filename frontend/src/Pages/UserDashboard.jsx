import React from 'react';

const UserDashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>User Dashboard</h2>
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Welcome, User!</h1>
        <p>Here’s your personalized dashboard.</p>
      </main>
    </div>
  );

};

export default UserDashboard;
