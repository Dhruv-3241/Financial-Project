import { authHeader } from '../utils/auth';

const API_URL = 'https://financial-project.onrender.com';

// Authentication APIs
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Payment APIs
export const getAllPayments = async () => {
  const response = await fetch(`${API_URL}/payment`, {
    headers: authHeader()
  });
  return response.json();
};

export const createPayment = async (paymentData) => {
  const response = await fetch(`${API_URL}/payment`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(paymentData)
  });
  return response.json();
};

export const getPaymentBreakout = async () => {
  const response = await fetch(`${API_URL}/payment/breakout`, {
    headers: authHeader()
  });
  return response.json();
};