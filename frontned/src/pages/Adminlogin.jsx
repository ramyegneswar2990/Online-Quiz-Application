import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin-login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'admin');
      setIsLoggedIn(true); // Set login status to true upon successful login
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  if (isLoggedIn) {
    // Redirect to Admin Dashboard after successful login
    return <Navigate to="/AdminDashboard" />;
  }

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin} autoComplete="off">
        {/* Hidden dummy inputs to prevent autofill */}
        <input type="text" name="fakeusernameremembered" style={{ display: 'none' }} />
        <input type="password" name="fakepasswordremembered" style={{ display: 'none' }} />

        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
          readOnly
          onFocus={(e) => e.target.removeAttribute('readOnly')}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          readOnly
          onFocus={(e) => e.target.removeAttribute('readOnly')}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
