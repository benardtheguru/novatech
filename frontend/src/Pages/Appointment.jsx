import React, { useEffect, useState } from "react";
import UserNavbar from "../components/navbar/UserNavbar.jsx";
import Calendar from 'react-calendar'; // Changed import
import 'react-calendar/dist/Calendar.css'; // Added react-calendar styles
import './auth.css';
import '../styles/Appointment.css';
import axios from "axios";

const Appointments = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date()); // Initialize with a Date object
  const [purpose, setPurpose] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUsername(user.name);
      setName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3001/api/appointments/create",
        { date: date.toDateString(), time, reason: purpose },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowPopup(true); // Show pop-up on submission
      // Optionally, hide the pop-up after a few seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="upload-container">
      <UserNavbar username={username} onLogout={handleLogout} />
      <main className="upload-main">
        <div className="upload-card">
          <h1 className="upload-title">Book an Appointment</h1>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="time">Time</label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="purpose">Purpose of Appointment</label>
              <textarea
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={5}
                required
              />
            </div>
            <div className="input-group">
              <label>Select a Date</label>
              <Calendar
                onChange={setDate}
                value={date}
                className="mx-auto"
              />
            </div>
            <button type="submit" className="upload-button">
              Book Appointment
            </button>
          </form>
        </div>
      </main>
      {showPopup && (
        <div className="appointment-popup">
          <p>Appointment application has been submitted to the admin!</p>
        </div>
      )}
    </div>
  );
};
export default Appointments;