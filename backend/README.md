
---

```markdown
# PayTrack - Backend

## Overview

The backend for **PayTrack** is built with Node.js, Express.js, and MongoDB. It provides API endpoints to handle payments, including adding new payments and fetching all payments stored in the MongoDB database.

## Features

- RESTful API to manage payments.
- Supports creating, reading, and listing payments categorized as personal, education, lifestyle, and miscellaneous.
- MongoDB for data storage.

## Tech Stack

- **Node.js** - JavaScript runtime for the backend.
- **Express.js** - Framework for building web applications and APIs.
- **MongoDB** - NoSQL database to store user and payment data.
- **Mongoose** - For Data modelling.

## Project Structure

Financial Project/
├── backend/
│   ├── config/
│   │   └── db.js  (MongoDB connection)
│   ├── middleware/
│   │   └── authMiddleware.js  (Middleware)
│   ├── models/
│   │   └── paymentModel.js  (Payment schema)
│   │   └── User.js  (User schema)
│   │   └── UserVerification.js  (User Verification schema)
│   ├── routes/
│   │   └── paymentRoutes.js (Payment API routes)
│   │   └── User.js (User API routes)
│   ├── server.js (Express server)
│   └── README.md

## Installation

1. Navigate to the `backend` directory:

   ```bash
   cd backend

2. Install dependencies
    ```bash
    npm install

3. Start the server:

        ```bash
        node server.js
        
The backend will be running on Render.
