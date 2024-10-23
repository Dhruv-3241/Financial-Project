
# PayTrack - Financial Web Application

## Overview
PayTrack is a comprehensive financial web application designed to help users manage their expenses, track payments, and visualize spending patterns. Built using ReactJS for the frontend and Node.js with Express and MongoDB for the backend, PayTrack aims to provide an intuitive user experience while leveraging modern web technologies.

## Features
- **User Authentication**: Secure signup and login functionality with JWT-based authentication.
- **Payment Management**: Users can add, edit, delete, and view their payments, categorized by different spending types.
- **Data Visualization**: Charts and graphs to visualize spending patterns over time.
- **Responsive Design**: A mobile-friendly interface that works seamlessly across devices.

## Tech Stack
- **Frontend**: ReactJS, Axios, Lottie for animations, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS, react-hot-toast for notifications

## Installation
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd paytrack
   ```

2. **Frontend Setup**:
   ```bash
   cd paytrack
   npm install
   npm run start
   ```

3. **Backend Setup**:
   ```bash
   cd server
   npm install
   node server.js
   ```

## API Endpoints
### Authentication
- `POST /api/login`: Authenticate user and return a token.
- `POST /api/signup`: Register a new user.

### Payments
- `GET /api/payments`: Retrieve all payments for the authenticated user.
- `POST /api/payments`: Create a new payment.

## Usage
- **Login**: Users can log in to access their payment dashboard.
- **Add Payment**: Users can input payment details, including amount, description, category, and date.
- **View Payments**: Users can view their payment history and analyze spending patterns through visualizations.

## Contributing
Contributions are welcome! Please create a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Inspired by various personal finance management tools.
