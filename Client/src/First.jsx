import React, { useState } from 'react';
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/First.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the email and password to the server
    axios
      .post(`/logins`, {
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data === 'success') {
          // Redirect based on the email address
          if (email === 'foc@gmail.com') {
            navigate(`/home`);
          } else if (email === 'fbess@gmail.com') {
            navigate(`/home1`);
          } else if (email === 'fot@gmail.com') {
            navigate(`/home2`);
          } else if (email === 'admin@gmail.com') {
            navigate(`/Ahome`);
          } else if (email === 'rector@gmail.com') {
            navigate(`/RectorHome`);  
          } else if (email === 'driver@gmail.com') {
            navigate(`/DriverHome`); 
          } else {
            setError('Incorrect email or password. Please try again.');
          }
        } else {
          setError('Incorrect email or password. Please try again.');
          alert('Incorrect email or password. Please try again.');
        }
      })
      .catch((err) => {
        console.log(err);
        setError('An error occurred while logging in. Please try again later.');
      });
  };
  const sendEmail = async () => {
    try {
      // Fetch data from the endpoint
      const response = await axios.get('/getSetting');
      const vehicleData = response.data;

      // Use the emailjs library to send the email
      emailjs.send('0767147170', 'template_o9udh2a', {
        to_email: 'www.miyurumanusha@gmail.com',
        subject: 'Forgot Password',
        message: `This is your password reset link. Vehicle Data: ${JSON.stringify(vehicleData)}`,
      }, 'yyBO_CCobC1_99wji')
        .then((response) => {
          console.log('Email sent successfully', response);
          alert('Email sent successfully');
        })
        .catch((error) => {
          console.error('Email could not be sent', error);
        });
    } catch (error) {
      console.error('Failed to fetch data from the endpoint', error);
    }
  };

  return (
      <div className="mainlogin-frame" style={{ backgroundImage: `url('kdu-entrance 1.png')`}}id="bg-image" >
        <div>
          <div className="header-rectangle" />
          <img className="logo" alt="Kotelawala defence" src="kdu.png" />
          <div class="Midbg"></div> 
        </div>
        <div className="midtext"> {/* Apply login-content class */}
          <div>
      <h2>
        General Sir John Kotelawala Defence University
        <br/>
        Southern Campus
        <br />
        Transport Management
      </h2>
      <p>
        To ensure a high-quality, learner-centered educational experience
        <br />
        through undergraduate, graduate, and professional programmes
        <br />
        along with high-quality research across many disciplines in the
        <br />
        field of defence, in both residential and non-residential settings in the campus.
      </p>
            </div>
          {/*<Link to="/" className="backbtn"> Back </Link>*/}

        <div className="loginarea">
            <form onSubmit={handleSubmit}>

            <input type="email" placeholder="Enter your email" autoComplete="off" name="email" className="emailtextinput" onChange={(e) => setEmail(e.target.value)}required/>
          
            <input type="password" placeholder="Enter your password" name="password" className="passwordtextinput" onChange={(e) => setPassword(e.target.value)}required/>
           
            <button type="submit" className="submitbtn"> Login </button>
            <p ><Link className="foget" onClick={sendEmail}>Forgot admin password</Link></p>
            
          
          </form>
          
          </div>
        </div>
      </div>




  );
}

export default Login;