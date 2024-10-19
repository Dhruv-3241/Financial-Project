
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
- **MongoDB** - NoSQL database to store payment data.

## Project Structure

paytrack/
│
├── backend/
│   ├── config/
│   │   └── db.js  (MongoDB connection)
│   ├── models/
│   │   └── paymentModel.js  (Payment schema)
│   ├── routes/
│   │   └── paymentRoutes.js (API routes)
│   ├── server.js (Express server)

## Installation

1. Navigate to the `backend` directory:

   ```bash
   cd backend

2. Install dependencies
    ```bash
    npm install

3. Set up your MongoDB connection:
    Create a .env file in the root of the backend folder with the following:

        ```bash
            MONGO_URI=mongodb://localhost:27017/paytrack
        Replace the MongoDB URI if needed.

4. Start the server:

        ```bash
        node server.js
        
The backend will be running on http://localhost:5000.