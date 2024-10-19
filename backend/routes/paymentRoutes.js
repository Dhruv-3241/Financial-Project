const express = require('express');
const router = express.Router();
const Payment = require('../models/payment.js');

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Create a new payment
router.post('/', async (req, res) => {
  const { amount, description, category } = req.body;

  if (!amount || !description || !category) {
    return res.status(400).json({ message: 'Please provide all fields: amount, description, category' });
  }

  try {
    const newPayment = new Payment({ amount, description, category });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Get payment breakout by category
router.get('/breakout', async (req, res) => {
  try {
    // Aggregate payments by category
    const categoryBreakout = await Payment.aggregate([
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
          payments: { 
            $push: {
              amount: '$amount',
              description: '$description',
              date: '$date'
            }
          }
        }
      },
      {
        $project: {
          category: '$_id',
          totalAmount: 1,
          count: 1,
          payments: 1,
          _id: 0
        }
      }
    ]);

    // Calculate total spending across all categories
    const totalSpending = categoryBreakout.reduce((sum, category) => sum + category.totalAmount, 0);

    // Add percentage of total spending for each category
    const breakoutWithPercentages = categoryBreakout.map(category => ({
      ...category,
      percentage: ((category.totalAmount / totalSpending) * 100).toFixed(2)
    }));

    const response = {
      categoryBreakout: breakoutWithPercentages,
      summary: {
        totalSpending,
        totalTransactions: breakoutWithPercentages.reduce((sum, category) => sum + category.count, 0),
        categoriesCount: breakoutWithPercentages.length
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching payment breakout:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;