import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/navbar/AdminNavbar";
import "../styles/Upload.css"; // Import the new CSS

const Upload = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !file) {
      setMessage("Please select a user and a file.");
      return;
    }

    const formData = new FormData();
    formData.append("resultFile", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3001/api/results/${selectedUser}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("File uploaded successfully.");
    } catch (err) {
      console.error(err);
      setMessage("File upload failed.");
    }
  };

  return (
    <div className="upload-container">
      <AdminNavbar />
      <main className="upload-main">
        <div className="upload-card">
          <h1 className="upload-title">Upload Test Result</h1>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="input-group">
              <label htmlFor="user">Select User</label>
              <select
                id="user"
                name="user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">-- Select a user --</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="file">Select File</label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="upload-button">
              Upload
            </button>
            {message && <p className="upload-message">{message}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Upload;
