import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import './PaymentForm.css';

const PaymentForm = ({ addPayment }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('personal');

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) >= 0)) {
      setAmount(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!amount || parseFloat(amount) <= 0) {
      return toast.error('Amount must be greater than 0.', { duration: 3000 });
    }

    if (!description.trim()) {
      return toast.error('Description cannot be empty.', { duration: 3000 });
    }

    try {
      // Add payment and show success toast if successful
      await addPayment({ amount: parseFloat(amount), description, category });
      // toast.success('Payment added successfully!', { duration: 3000 });

      // Reset form fields
      setAmount('');
      setDescription('');
      setCategory('personal');
    } catch (error) {
      // Show error toast if adding payment fails
      toast.error('Failed to add payment. Please try again.', { duration: 3000 });
      console.error('Error adding payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <Toaster
        position="top-center"
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

      <input
        type="text"
        inputMode="decimal"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Amount"
        required
        className="no-spinner"
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="personal">Personal</option>
        <option value="education">Education</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="miscellaneous">Miscellaneous</option>
      </select>

      <button type="submit">Add Payment</button>
    </form>
  );
};

export default PaymentForm;
