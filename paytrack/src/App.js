import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AllPaymentsPage from './pages/AllPaymentsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/Signup';
import BreakoutPage from './components/BreakoutPage';
import './styles.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!localStorage.getItem('token') // Check token to persist login
  );

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="outerbox">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <LandingPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/signup"
              element={<SignupPage onAuthentication={handleAuthentication} />}
            />
            <Route
              path="/login"
              element={<LoginPage onAuthentication={handleAuthentication} />}
            />
            <Route
              path="/all-payments"
              element={
                isAuthenticated ? <AllPaymentsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/breakout"
              element={
                isAuthenticated ? <BreakoutPage /> : <Navigate to="/login" />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            border: '1px solid #713200',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '800',
            color: '#000000',
            fontFamily: 'Times New Roman',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        }}
      />
    </div>
  );
};

export default App;
