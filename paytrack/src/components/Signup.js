import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Lottie from 'react-lottie';
import animationData from '../assets/Signup_Aniamtion.json';
import './Signup.css';

const SignupPage = ({ onAuthentication }) => {
  const [originalname, setOriginalname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('https://financial-project.onrender.com/user/signup', { originalname, username, email, password });
      toast.success('Account created successfully!');
      
      // Store the token (if your backend sends one)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // Call the onAuthentication function passed from the parent
      onAuthentication();
      
      // Navigate to the landing page
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create a PayTrack Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={originalname}
            onChange={(e) => setOriginalname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p id="signupsubtext">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
      <div className="signup-image">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </div>
  );
};

export default SignupPage;