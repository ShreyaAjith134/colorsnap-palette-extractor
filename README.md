# ColorSnap – Color Palette Generator

ColorSnap is a full-stack web application that extracts color palettes from images, allows users to create custom palettes, and saves them under user-specific accounts. The system includes authentication, database storage, and a structured REST API.

## Overview

ColorSnap enables users to:
- Upload an image and automatically extract dominant colors.
- Create custom palettes manually.
- Add optional notes to palettes.
- Save and view palettes associated with their account only.
- Copy hex codes directly from the interface.

## Features

### Palette Extraction
- Extract dominant colors from uploaded images.
- Displays hex values for each color.
- Click-to-copy functionality.

### User Accounts
- Sign Up / Login system.
- Password hashing using bcrypt.
- User session handled via localStorage.

### Palette Management
- Each saved palette is stored with a userId.
- Users can view only their own saved palettes.
- MongoDB stores user and palette data.

## Technologies Used

### Frontend
- React.js
- React Router
- extract-colors
- CSS
- LocalStorage

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- REST API

## Project Structure

ColorSnap/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │    ├── authRoutes.js
│   │    └── paletteRoutes.js
│   ├── models/
│   │    ├── User.js
│   │    └── Palette.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── assets/
    │   └── App.js
    └── package.json

## Setup Instructions

### 1. Clone the Repository
git clone https://github.com/your-username/ColorSnap.git
cd ColorSnap

## Backend Setup

### 2. Navigate to backend directory
cd backend

### 3. Install dependencies
npm install

### 4. Create a .env file
MONGO_URI=your_mongodb_connection_string
PORT=5000

### 5. Start backend server
node server.js

## Frontend Setup

### 6. Navigate to frontend directory
cd ../frontend

### 7. Install frontend dependencies
npm install

### 8. Start the development server
npm start

Frontend will run at:
http://localhost:3000

## REST API Endpoints

### Authentication
POST /api/auth/signup        - Register a new user  
POST /api/auth/login         - Authenticate user and return userId  

### Palettes
POST /api/palettes           - Save a palette linked to a user  
GET /api/palettes/:userId    - Get all palettes for a specific user  

## License

This project is intended for personal and educational use.
