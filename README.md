
# User Authentication System

This project is a full-stack user authentication system built using Node.js, Express, MongoDB, and Mongoose for the backend, and HTML, CSS, and JavaScript for the frontend. The system includes features for user registration, login, and profile management, with secure authentication using JWT tokens and password hashing with bcrypt.

## Features

- User Registration
- User Login
- Profile Management
- Secure Authentication with JWT
- Password Hashing with bcrypt
- Responsive UI

## Technologies Used

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt

### Frontend
- HTML
- CSS
- JavaScript

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/user-authentication-system.git
    ```

2. Navigate to the project directory:
    ```sh
    cd user-authentication-system
    ```

3. Install backend dependencies:
    ```sh
    cd backend
    npm install
    ```

4. Install frontend dependencies:
    ```sh
    cd ../frontend
    npm install
    ```

5. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```sh
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

## Usage

1. Start the backend server:
    ```sh
    cd backend
    npm start
    ```

2. Start the frontend server:
    ```sh
    cd ../frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Folder Structure

```plaintext
user-authentication-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── scripts.js
│   ├── index.html
│   ├── profile.html
│   ├── package.json
│   └── README.md
│
└── README.md
```

## License

This project is licensed under the MIT License.
