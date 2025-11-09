import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    const res = await axios.post("http://localhost:3000/api/auth/login", {
       email,
       password,
      });

      console.log('Login response:', res.data);
      localStorage.setItem("token", res.data.token);
     

     if(res.data.user.role ==="admin"){
      navigate("/admin/dashboard");
      console.log("Login successful. The user is an admin.");
     }else{
      // navigate("/user/dashboard");
      navigate("/signup");
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
         <div className="input-group">
          <input
              type="email"
             className="auth-input"
             placeholder="Email Address"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
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
         required
        />
      </div>

       <button type="submit" className="auth-button">
           Login
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