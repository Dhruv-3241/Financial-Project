import React from 'react';
import { Container, Box } from '@mui/material';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Container maxWidth="lg" className="layout-content">
        <Box sx={{ my: 4 }}>
          {children}
        </Box>
      </Container>
    </div>
  );
};

export default Layout;