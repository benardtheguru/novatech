import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>Manage Users</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Welcome, Admin!</h1>
        <p>This is your professional dashboard.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
