// // src/components/Breakout.js
// import React, { useState, useEffect } from 'react';
// import {
//   PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip,
// } from 'recharts';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/UI/card';
// import './Breakout.css';

// // Utility function to capitalize the first letter of a string
// const capitalizeFirstLetter = (string) =>
//   string.charAt(0).toUpperCase() + string.slice(1);

// const SpendingBreakdown = () => {
//   const [breakdownData, setBreakdownData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

//   useEffect(() => {
//     const fetchBreakdownData = async () => {
//       try {
//         const response = await fetch('https://financial-project.onrender.com/api/payment/breakout');
//         if (!response.ok) throw new Error('Failed to fetch data');
//         const data = await response.json();
//         setBreakdownData(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchBreakdownData();
//   }, []);

//   if (loading) return <div className="loading text-center p-4">Loading...</div>;
//   if (error) return <div className="error-message">Error: {error}</div>;

//   if (!breakdownData?.categoryBreakout?.length) {
//     return (
//       <div className="empty-state">
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
//         </svg>
//         <p>No spending data available</p>
//       </div>
//     );
//   }

//   const { categoryBreakout, summary } = breakdownData;

//   return (
//     <div className="cards-container">
//       <div className="card-wrapper">
//         <Card>
//           <CardHeader>
//             <CardTitle>Spending Overview</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="stats-grid">
//               <div className="stat-item">
//                 <p className="stat-value amount">
//                   ₹{summary.totalSpending.toFixed(2)}
//                 </p>
//                 <p className="text-gray-600">Total Spent</p>
//               </div>
//               <div className="stat-item">
//                 <p className="stat-value">
//                   {summary.totalTransactions}
//                 </p>
//                 <p className="text-gray-600">Total Transactions</p>
//               </div>
//               <div className="stat-item">
//                 <p className="stat-value">
//                   {summary.categoriesCount}
//                 </p>
//                 <p className="text-gray-600">Categories</p>
//               </div>
//             </div>

//             <div className="chart-container">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={categoryBreakout}
//                     dataKey="totalAmount"
//                     nameKey="category"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     fill="#8884d8"
//                     label={({ category, percentage }) =>
//                       `${capitalizeFirstLetter(category)} (${percentage}%)`}
//                     cursor={'pointer'}
//                   >
//                     {categoryBreakout.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="categories-container">
//         {categoryBreakout.map((category) => (
//           <Card key={category.category} className="category-card">
//             <CardHeader>
//               <CardTitle className="category-header">
//                 <span className="category-label">
//                   {capitalizeFirstLetter(category.category)}
//                 </span>
//                 <span className="amount">₹{category.totalAmount.toFixed(2)}</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="category-stats">
//                 {category.count} transactions · {category.percentage}% of total spending
//               </p>
//               <div className="payment-list">
//                 {category.payments.map((payment, index) => (
//                   <div key={index} className="payment-item">
//                     <span className="payment-description">
//                       {payment.description}
//                     </span>
//                     <span className="amount">₹{payment.amount.toFixed(2)}</span>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpendingBreakdown;


import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/UI/card';
import { getPaymentBreakout } from '../services/API';
import toast from 'react-hot-toast';
import './Breakout.css';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => 
  string.charAt(0).toUpperCase() + string.slice(1);

const SpendingBreakdown = () => {
  const [breakdownData, setBreakdownData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  useEffect(() => {
    const fetchBreakdownData = async () => {
      try {
        const data = await getPaymentBreakout();
        setBreakdownData(data);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch spending breakdown. Please try again.", {
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

    fetchBreakdownData();
  }, []);

  if (loading) return (
    <div className="loading text-center p-4">
      <p className="text-lg font-semibold">Loading your spending breakdown...</p>
    </div>
  );

  if (error) return (
    <div className="error-message p-4 text-center">
      <p className="text-red-600 font-semibold">Error: {error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );

  if (!breakdownData?.categoryBreakout?.length) {
    return (
      <div className="empty-state p-8 text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          className="w-16 h-16 mx-auto mb-4 text-gray-400"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20 12H4" 
          />
        </svg>
        <p className="text-lg font-semibold text-gray-600">No spending data available</p>
        <p className="text-gray-500 mt-2">Start adding your expenses to see your spending breakdown</p>
      </div>
    );
  }

  const { categoryBreakout, summary } = breakdownData;

  return (
    <div className="cards-container">
      <div className="card-wrapper">
        <Card>
          <CardHeader>
            <CardTitle>My Spending Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="stats-grid">
              <div className="stat-item">
                <p className="stat-value amount">
                  ₹{summary.totalSpending.toFixed(2)}
                </p>
                <p className="text-gray-600">Total Spent</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">
                  {summary.totalTransactions}
                </p>
                <p className="text-gray-600">Total Transactions</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">
                  {summary.categoriesCount}
                </p>
                <p className="text-gray-600">Categories</p>
              </div>
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakout}
                    dataKey="totalAmount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ category, percentage }) => 
                      `${capitalizeFirstLetter(category)} (${percentage}%)`}
                    cursor={'pointer'}
                  >
                    {categoryBreakout.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `₹${value.toFixed(2)}`}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="categories-container">
        {categoryBreakout.map((category) => (
          <Card key={category.category} className="category-card">
            <CardHeader>
              <CardTitle className="category-header">
                <span className="category-label">
                  {capitalizeFirstLetter(category.category)}
                </span>
                <span className="amount">₹{category.totalAmount.toFixed(2)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="category-stats">
                {category.count} transactions · {category.percentage}% of total spending
              </p>
              <div className="payment-list">
                {category.payments.map((payment, index) => (
                  <div key={index} className="payment-item">
                    <span className="payment-description">
                      {payment.description}
                    </span>
                    <span className="amount">₹{payment.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpendingBreakdown;