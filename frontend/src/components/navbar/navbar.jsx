import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ username, onLogout }) => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <ul className="flex items-center space-x-8">
          <li>
            <Link to="/admin/dashboard" className="hover:text-primary">Home</Link>
          </li>
          <li>
            <Link to="/admin/upload" className="hover:text-primary">Upload</Link>
          </li>
          <li>
            <Link to="/admin/about" className="hover:text-primary">About Us</Link>
          </li>
          <li>

          </li>
          <li>
            <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
