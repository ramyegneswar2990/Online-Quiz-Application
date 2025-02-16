import React, { useState } from 'react';
import { Navigate ,Link} from 'react-router-dom';
import axios from 'axios';
import './Adminlogin.css';

const Adminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const res = await axios.post('http://localhost:5000/api/auth/admin-login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'admin');
      setIsLoggedIn(true);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/AdminDashboard" />;
  }

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin} autoComplete="off">
        <h2>Admin Login</h2>

        {error && <div className="error-message">{error}</div>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/AdminRegistration">Click to Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Adminlogin;
