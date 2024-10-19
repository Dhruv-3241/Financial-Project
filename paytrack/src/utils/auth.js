// Store token in localStorage
export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Get token from localStorage
  export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  // Remove token from localStorage
  export const removeAuthToken = () => {
    localStorage.removeItem('token');
  };
  
  // Check if user is authenticated
  export const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token;
  };
  
  // Create headers with auth token
  export const authHeader = () => {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };