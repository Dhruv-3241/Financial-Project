import React from 'react';
import './card.css'; // Import the external CSS file

export function Card({ className, ...props }) {
  return (
    <div className={`card ${className}`} {...props} />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={`card-header ${className}`} {...props} />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3 className={`card-title ${className}`} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div className={`card-content ${className}`} {...props} />
  );
}
