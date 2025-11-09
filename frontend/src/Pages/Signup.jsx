import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./auth.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('user');
    const [error, setError] = useState("");
 const [adminLoginId, setAdminLoginId] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const res = await axios.post('http://localhost:3001/api/auth/signup', {
          name,
          email,
          password,
          role
        });

        console.log('Signup successful:', res.data);
        localStorage.setItem('token', res.data.token);
        // if admin signup, show generated loginId so the admin can use unique login page
        if (res.data?.user?.role === 'admin' && res.data.user.loginId) {
          setAdminLoginId(res.data.user.loginId);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('Signup error:', err.response?.data || err.message);
        setError(err.response?.data?.msg || 'Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Create Account</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
                {error}
              </div>
            )}

            {adminLoginId && (
              <div style={{ background: '#f6f9ff', padding: '12px', borderRadius: 8, marginBottom: 12 }}>
                <strong>Admin created.</strong>
                <div style={{ marginTop: 6 }}>Login ID: <code>{adminLoginId}</code></div>
                <div style={{ marginTop: 6 }}>
                  Admin login page: <a href={`/admin/login/${adminLoginId}`}>{`/admin/login/${adminLoginId}`}</a>
                </div>
              </div>
            )}

            <input
              type="text"
              className="auth-input"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />

            <input
              type="email"
              className="auth-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />

            <select
              className="auth-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="password"
              className="auth-input"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    );
  };

export default Signup;
