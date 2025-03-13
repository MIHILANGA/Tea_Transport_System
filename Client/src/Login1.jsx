import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://kdu-tms.onrender.com/login1', {
      email,
      password,
    })
      .then(result => {
        console.log(result);
        if (result.data === 'success') {
          navigate('/home1');
        }
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
          <Link to="/" className="btn btn-curly w-10">
              <b>Back to Main</b>
            </Link>
        </div>

        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="bg-white p-3 rounded w-25">
            <h2>Login MA FDSS</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label><br />
                <input
                  type="email"
                  placeholder="Enter your Dep email"
                  autoComplete="off"
                  name="email"
                  className="form-control-curly rounded-5"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label><br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  className="form-control-curly rounded-5"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-curly w-100"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
