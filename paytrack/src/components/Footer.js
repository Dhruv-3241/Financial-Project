import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Typography variant="body2" className="footer-content">
        © {new Date().getFullYear()} PayTrack. All rights reserved.
      </Typography>
      <Box mt={1}>
        <Link href="#" className="footer-link">Privacy Policy</Link>
        <Link href="#" className="footer-link">Terms of Service</Link>
        <Link href="#" className="footer-link">Contact Us</Link>
      </Box>
    </Box>
  );
};

export default Footer;