# Nettbutikk

## Overview
Nettbutikk is a modern e-commerce platform built with React and Express. It features a responsive design for browsing and purchasing clothing items, with separate user and admin functionalities.

## Features

### Customer Features
- **Product Browsing**: View all products or filter by category (Hoodies, T-shirts)
- **Product Details**: View detailed information about each product
- **User Authentication**: Register and log in to access user-specific features
- **Responsive Design**: Fully responsive interface that works on mobile, tablet, and desktop

### Admin Features
- **Product Management**: Add new clothing items with images, descriptions, and pricing
- **Delete Products**: Remove products from the database when no longer available
- **User Management**: View and manage user accounts

## Technology Stack

### Frontend
- **React 19**: For building the user interface
- **React Router 7**: For handling client-side routing
- **Axios**: For making HTTP requests to the backend
- **Tailwind CSS 4**: For styling the application

### Backend
- **Express.js**: Web server framework
- **MongoDB**: NoSQL database for storing product and user data
- **Mongoose**: Object Data Modeling (ODM) for MongoDB
- **JWT**: For authentication and authorization
- **bcrypt**: For password hashing
- **express-fileupload**: For handling file uploads

## Project Structure
```
nettbutikk/
│
├── frontend/              # React frontend application
│   ├── public/            # Static files
│   ├── src/               # Source files
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # Context providers
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main App component
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
│
├── backend/               # Express backend application
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   ├── server.js          # Entry point
│   └── package.json       # Backend dependencies
│
└── README.md              # Project documentation
```

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT = 5000
SALT_ROUNDS = [some number]
MONGODB_URI = mongodb://localhost:27017/online-store
SECRET_KEY = your_jwt_secret_key
FRONTEND_URL = http://localhost:3000
```

4. Start the server:
```bash
npm start
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with:
```
VITE_BACKEND_URL = http://localhost:4000
```

4. Start the development server:
```bash
npm start
```

## Usage

### Customer Usage
- Browse the homepage to see all available products
- Filter products by category using the dropdown
- Click on a product to view details
- Create an account or log in to access additional features

### Administrator Usage
- Log in with admin credentials
- Add new products using the "Add Clothing" button in the navbar
- Delete products from the product detail page using the delete button

### Resetting password
- Go to https://ethereal.email/create
- Press Login
- Use the username: jeff.konopelski49@ethereal.email
- Use the password: 2KxgqpmfrGvEb8P36N
- Go to messages to see verification email and press the link in the mail

## License
This project is licensed under the MIT License.

## Contributors
- Lukasz Brzozowski - Developer
- Claude 3.7 Sonnet, AnthropicAI - Co-developer

## Acknowledgments
- Special thanks to Vite and React for making the development process smooth
- Tailwind CSS for the beautiful styling framework
- Express and MongoDB for powerful backend capabilities