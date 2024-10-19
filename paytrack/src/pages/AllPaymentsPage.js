// src/components/AllPaymentsPage.js
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './AllPaymentsPage.css';

const AllPaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/payment');
      if (!response.ok) {
        throw new Error(`Error fetching payments: ${response.statusText}`);
      }
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error("Failed to fetch payments. Please try again.", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          fontSize: "16px",
          fontWeight: "800",
          color: "#000000",
          fontFamily: "Times New Roman",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading payments...</p>;
  if (!payments.length) return <p>No payments found</p>;

  const categories = [
    { name: 'Personal', color: '#ff6b6b' },
    { name: 'Education', color: '#4ecdc4' },
    { name: 'Lifestyle', color: '#45b7d1' },
    { name: 'Miscellaneous', color: '#f7b731' },
  ];

  return (
    <div className="all-payments-page">
      <h1>All Payments</h1>
      <div className="payment-grid">
        {payments.map((payment) => (
          <div key={payment._id} className={`payment-card ${payment.category.toLowerCase()}`}>
            <h3>{payment.description}</h3>
            <p className="amount">₹{payment.amount.toFixed(2)}</p>
            <p className="category">{payment.category}</p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="legend">
        <table className="legend-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.name}>
                <td className="Category">{category.name}</td>
                <td>
                  <span
                    className="color-box"
                    style={{ backgroundColor: category.color}}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPaymentsPage;
