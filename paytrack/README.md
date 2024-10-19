# PayTrack - Frontend

## Overview

**PayTrack** is a simple financial web application built with ReactJS that allows users to segregate their payments into categories such as personal, education, lifestyle, and miscellaneous. This frontend application interacts with the backend API to fetch and store payment data.

## Features

- Add new payments with an amount, description, and category.
- View categorized payments in a list format.
- Simple, clean UI with responsive design.

## Tech Stack

- **ReactJS** - UI framework for building user interfaces.
- **CSS** - For styling the components.
- **Lottie Animation** - For making the website interactive.
- **Axios** - For fetching data

## Project Structure

```
├── paytrack/
│   ├── src/
│   │   ├── components/
│   │   │   └── UI/
│   │   │   │   └── card.js (Card component)
│   │   │   └── BreakoutPage.js (Breakout Page Component)
│   │   │   └── Footer.js (Footer Component)
│   │   │   └── Layout.js (Layout Component)
│   │   │   └── LoginPage.js (LoginPage Component)
│   │   │   └── Navbar.js (Navbar Component)
│   │   │   └── ProtectedRoute.js (Routes Component)
│   │   │   └── Signup.js (SignUp Page Component)
│   │   ├── pages/
│   │   │   └── AllPaymentsPage.js (All Payments Page Component)
│   │   │   └── LandingPage.js (Landing Page Component)
│   │   │   └── PaymentForm.js (Payment Form Component)
│   │   ├── services/
│   │   │   └── API.js (API Component)
│   │   ├── utils/
│   │   │   └── auth.js (Auth Component)
│   │   │   └── axios-config.js (Axios Component)
│   │   ├── assets 
│   │   ├── App.js (Main App component)
│   │   ├── index.js (React entry point)
│   │   └── styles.css (CSS for the UI)
│   ├── package.json (dependencies)
│   └── README.md


