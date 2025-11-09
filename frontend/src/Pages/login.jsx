import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
   e.preventDefault();
    setError("");
    setLoading(true);

     try {
    const res = await loginUser({
       email,
       password,
      });

      console.log('Login response:', res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);


     if(res.data.user.role ==="admin"){
      navigate("/admin/dashboard");
      console.log("Login successful. The user is an admin.");
     }else{
      navigate("/user/dashboard");
      console.log("Login successful. The user is a normie user.");
     }

     } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.msg || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }

  };

  return (
     <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
              {error}
            </div>
          )}
         <div className="input-group">
          <input
              type="email"
             className="auth-input"
             placeholder="Email Address"
              value={email}
             onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
           />
           </div>

        <div className="input-group">
           <input
         type="password"
         className="auth-input"
         placeholder="Password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         disabled={loading}
         required
        />
      </div>

       <button type="submit" className="auth-button" disabled={loading}>
           {loading ? 'Logging in...' : 'Login'}
        </button>
        </form>
       <p className="auth-switch">
       Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
    </div>
  );
};

export default Login;