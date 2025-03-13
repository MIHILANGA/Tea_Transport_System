import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', {
      name,
      email,
      password,
    })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login-frame" style={{ backgroundImage: `url('kdu-entrance 1.png')` }}>
      <div className="overlap">
        <div className="hedder">
          <div className="rectangle" />
          <img className="kotelawala-defence" alt="Kotelawala defence" src="p1.png"/>
          <img className="southen" alt="Southen" src="southen1 1.png" />
          <Link to="/" className="btn btn-default align-right border w-10 bg-light rounded-0 text-decoration-none">
              <b>Back to Main</b>
            </Link>
        </div>

        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="bg-white p-2 rounded w-25">
            <h3>Register MA Only</h3>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0" style={{ backgroundColor: 'darkgoldenrod' }}>
            Register
          </button>
            </form>
            <p>Already Have an Account</p>
            <Link to='/login' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
