import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css'; // Import the CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginData = isAdmin ? { username, password } : { email, password };
    console.log('Login Payload:', loginData);

    try {
      const endpoint = isAdmin ? '/api/admin/login' : '/api/users/login';
      const response = await axios.post(`http://localhost:5000${endpoint}`, loginData);

      if (response.data.success) {
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Tea Transport System</h1>
        <p className="login-subtitle">Welcome back! Please log in to continue.</p>
        <div className="login-toggle">
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <span className="toggle-label">Login as Admin</span>
          </label>
        </div>
        <div className="login-input">
          {isAdmin ? (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </div>
        <div className="login-input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>Login</button>
        <div className="login-footer">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;