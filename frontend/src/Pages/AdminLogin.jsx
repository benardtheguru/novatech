import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './auth.css';

export default function AdminLogin(){
  const { loginId } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try{
      const res = await axios.post('http://localhost:3001/api/auth/login', { email, password, loginId });
      if (res.data?.user?.role !== 'admin'){
        setError('This login ID does not belong to an admin.');
        setLoading(false);
        return;
      }
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    }catch(err){
      console.error('Admin login error:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Login failed');
    }finally{ setLoading(false); }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Admin Login</h2>
        {loginId && <div style={{marginBottom:12}}>Login ID: <code>{loginId}</code></div>}
        {error && <div style={{color:'red', marginBottom:12}}>{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input className="auth-input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required disabled={loading} />
          <input className="auth-input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required disabled={loading} />
          <button className="auth-button" type="submit" disabled={loading}>{loading? 'Logging in...':'Login'}</button>
        </form>
      </div>
    </div>
  );
}
