import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PaymentForm from './PaymentForm';
import Lottie from 'react-lottie';
import animationData from '../assets/Transaction_Completed.json'; // Import Lottie animation
import './LandingPage.css';
import { createPayment } from '../services/API';

const LandingPage = () => {
  const [showAnimation, setShowAnimation] = useState(false); // Control animation visibility

  // const handleAddPayment = async (payment) => {
  //   try {
  //     const response = await fetch('https://financial-project.onrender.com/api/payment', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payment),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Error adding payment: ${response.statusText}`);
  //     }

  //     // Show animation for 3 seconds
  //     setShowAnimation(true);
  //     setTimeout(() => setShowAnimation(false), 7000);

  //     toast.success('Payment added successfully!', {
  //       style: {
  //         border: '1px solid #713200',
  //         padding: '16px',
  //         fontSize: '16px',
  //         fontWeight: '800',
  //         color: '#000000',
  //         fontFamily: 'Times New Roman',
  //       },
  //       iconTheme: {
  //         primary: '#713200',
  //         secondary: '#FFFAEE',
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error adding payment:', error);
  //     toast.error('Failed to add payment. Please try again.', {
  //       style: {
  //         border: '1px solid #713200',
  //         padding: '16px',
  //         fontSize: '16px',
  //         fontWeight: '800',
  //         color: '#000000',
  //         fontFamily: 'Times New Roman',
  //       },
  //       iconTheme: {
  //         primary: '#713200',
  //         secondary: '#FFFAEE',
  //       },
  //     });
  //   }
  // };


  const handleAddPayment = async (payment) => {
    try {
      await createPayment(payment);

      // Show animation for 3 seconds
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 7000);

      toast.success('Payment added successfully!', {
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
      });
    } catch (error) {
      console.error('Error adding payment:', error);
      toast.error('Failed to add payment. Please try again.', {
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
      });
    }
  };

  // Lottie animation options
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="landing-page">
      <h1>Welcome to PayTrack</h1>
      <p>Keep track of your expenses with ease.</p>

      {showAnimation ? (
        <Lottie options={defaultOptions} height={400} width={400} />
      ) : (
        <>
          <p>Add a new payment below:</p>
          <PaymentForm addPayment={handleAddPayment} />
        </>
      )}
    </div>
  );
};

export default LandingPage;
