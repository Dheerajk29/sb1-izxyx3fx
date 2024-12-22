# Food Delivery Application

A full-stack food delivery application built with the MERN stack.

## Features

- User authentication (signup, login, logout)
- Restaurant listing and menu management
- Cart functionality
- Order placement and tracking
- Real-time order status updates
- Admin dashboard
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

## Running the Application

Development mode:
```bash
npm run dev:all
```

This will start both the frontend (Vite) and backend servers concurrently.

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Documentation

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user

### Restaurants
- GET /api/restaurants - Get all restaurants
- GET /api/restaurants/:id - Get restaurant details
- POST /api/restaurants - Add new restaurant (admin only)
- PUT /api/restaurants/:id - Update restaurant (admin only)

### Orders
- POST /api/orders - Place new order
- GET /api/orders - Get user orders
- GET /api/orders/:id - Get order details
- PUT /api/orders/:id/status - Update order status (admin only)

## Tech Stack

- Frontend: React.js, Vite, TailwindCSS
- Backend: Node.js, Express.js
- Database: MongoDB
- State Management: Zustand
- Real-time Updates: Socket.io