import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Lottie from 'react-lottie';
import animationData from '../assets/Login_Animation.json';
import { setAuthToken } from '../utils/auth'; // Import the new auth utility
import '../components/LoginPage.css';

const LoginPage = ({ onAuthentication }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const navigate = useNavigate();

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Generate a random CAPTCHA when the component mounts
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (captchaInput !== captcha) {
      toast.error('CAPTCHA does not match. Please try again.');
      generateCaptcha();
      return;
    }

    try {
      const response = await axios.post('https://financial-project.onrender.com/user/login', { email, password });
      
      // Store the token in localStorage using the new auth utility
      setAuthToken(response.data.token);
      
      // Store user data
      localStorage.setItem('userData', JSON.stringify(response.data.data));
      
      // Configure axios defaults for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      toast.success('Login successful!');
      onAuthentication(); // Update authentication state
      navigate('/'); // Navigate to the landing page
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
      generateCaptcha(); // Generate new CAPTCHA on failure
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to PayTrack</h2>
        <form onSubmit={handleLogin}>
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

          <div className="captcha-container">
            <span className="captcha-text">{captcha}</span>
            <button 
              type="button" 
              className="refresh-captcha" 
              onClick={generateCaptcha}
              aria-label="Refresh CAPTCHA"
            >
              🔄
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />

          <button className="loginbtn" type="submit">Login</button>
        </form>
        <p id="subtext">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
      <div className="login-image">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </div>
  );
};

export default LoginPage;