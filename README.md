# Social Media App Demo

This project is a web-based social media application built using **Node.js**, **Express**, **MongoDB**, and **React**.

## Table of Contents

-   [Live Demo](#live-demo)
-   [Installation](#installation)
-   [Technologies Used](#technologies-used)
-   [API Endpoints](#api-endpoints)
-   [MongoDB Models](#mongodb-models)
-   [Component Details (REACT)](#component-details-react)
-   [Backend Structure](#backend-structure)
-   [Contact](#contact)

## Live Demo

Check out the live version :

-   **Website**: [https://social-media-ashen.vercel.app/auth/](https://social-media-ashen.vercel.app/auth/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/miranas11/socialMedia
    ```

2. Change the ENV setting in .env from "PROD" to "DEV"

3. Install the dependencies and start servers:

    ```bash
    cd backend
    npm install
    node server.js
    ```

    ```bash
    cd frontend
    npm install
    npm start
    ```

## Technologies Used

### Backend

-   Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
-   Express.js: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
-   MongoDB ATLAS: A NoSQL database for modern applications that use a flexible, JSON-like format to store data.
    data.

### Frontend

-   React: A JavaScript library for building user interfaces, maintained by Facebook and a community of individual developers and companies.

### Tools and Packages

-   **bcrypt** (`^5.1.1`): Library for hashing passwords to enhance security.
-   **cors** (`^2.8.5`): Middleware to enable Cross-Origin Resource Sharing (CORS), allowing frontend and backend to communicate across different domains.
-   **dotenv** (`^16.4.5`): Module to load environment variables from a `.env` file into `process.env`.
-   **express** (`^4.21.1`): Web application framework for Node.js, used for building the backend APIs.
-   **express-rate-limit** (`^7.4.1`): Middleware to apply rate limiting to APIs, helping prevent brute-force attacks.
-   **jsonwebtoken** (`^9.0.2`): Used for creating and verifying JSON Web Tokens (JWTs) for secure user authentication.
-   **mongodb** (`^6.10.0`): Official MongoDB driver for Node.js, enabling database connection and operations.
-   **mongoose** (`^8.8.0`): ODM library for MongoDB, providing a schema-based solution to model application data.
-   **nodemon** (`^3.1.7`): Utility that automatically restarts the server when file changes are detected, improving development workflow.
-   **socket.io** (`^4.8.1`): Library for enabling real-time, bidirectional communication between client and server for chat and notifications.
-   **axios** (`^1.7.7`): Promise-based HTTP client for making requests to the backend API.
-   **react** (`^18.3.1`): JavaScript library for building the user interface of the application.
-   **react-dom** (`^18.3.1`): Entry point to the DOM for React applications.
-   **react-icons** (`^5.3.0`): Provides popular icons as React components, used to add icons throughout the application.
-   **react-loader-spinner** (`^6.1.6`): Component library providing customizable loaders and spinners for loading states.
-   **react-router-dom** (`^6.27.0`): Declarative routing library for React, used to handle navigation between pages.
-   **react-scripts** (`5.0.1`): Scripts and configuration used by Create React App.
-   **socket.io-client** (`^4.8.1`): Client-side library for connecting to the Socket.io server, enabling real-time features such as chat.

## API Endpoints

| HTTP Verbs | Endpoints                         | Action                                        |
| ---------- | --------------------------------- | --------------------------------------------- |
| POST       | /api/users/register               | Register a new user                           |
| POST       | /api/users/login                  | User login and JWT token issuance             |
| GET        | /api/users/profile/:id            | Retrieve a user's profile by ID               |
| PUT        | /api/users/profile                | Update the logged-in user's profile           |
| GET        | /api/users/friends                | Get the friend list of the logged-in user     |
| GET        | /api/users/search                 | Search for users by username                  |
| POST       | /api/friend-requests/send         | Send a friend request                         |
| PUT        | /api/friend-requests/:id/accept   | Accept a friend request by ID                 |
| PUT        | /api/friend-requests/:id/reject   | Reject a friend request by ID                 |
| GET        | /api/friend-requests/             | Retrieve friend requests                      |
| POST       | /api/chatmessages/send            | Send a chat message                           |
| GET        | /api/chatmessages/:receiverId     | Retrieve chat messages between users          |
| PUT        | /api/chatmessages/:messageId/read | Mark a chat message as read                   |
| GET        | /api/activity-logs/               | Retrieve user activity logs                   |
| GET        | /api/notifications/               | Retrieve notifications for the logged-in user |

## MongoDB Models

### 1. User Model

Defines user details and manages authentication.

-   **username**: Unique username for each user (required).
-   **email**: Unique user email, validated and stored in lowercase (required).
-   **password**: User password, hashed with bcrypt for security (minimum 8 characters, required).
-   **profileImage**: URL to the user’s profile image (default is an empty string).
-   **lastLogin**: Stores the date and time of the user’s last login (default: `null`).
-   **friendsList**: Array of user IDs representing friends.
-   **twoFactorEnabled**: Boolean to indicate if 2FA is enabled (default: `false`).
-   **twoFactorSecret**: Secret key for 2FA (default: `null`).
-   **createdAt**: Date of user creation (default: current date).
-   **updatedAt**: Date of the last update (default: current date).

### 2. Activity Log Model

Records significant user activities.

-   **userId**: References the `User` model (required).
-   **activityType**: Type of activity, such as "Registration" or "Friend Request Sent" (required).
-   **details**: Description or details of the activity (required).
-   **timestamp**: Date and time of the activity (default: current date).

### 3. Chat Message Model

Represents messages sent between users.

-   **senderId**: ID of the user who sent the message (required).
-   **receiverId**: ID of the user who received the message (required).
-   **message**: Content of the message (required).
-   **timestamp**: Date and time the message was sent (default: current date).
-   **status**: Status of the message, either "read" or "unread" (default: "unread").

### 4. Friend Request Model

Manages friend request interactions between users.

-   **sender**: ID of the user who sent the friend request (required).
-   **receiver**: ID of the user receiving the friend request (required).
-   **createdAt**: Date when the friend request was sent (default: current date).
-   **updatedAt**: Date of the last update to the request (default: current date).

### 5. Notification Model

Tracks notifications sent to users.

-   **userId**: ID of the user receiving the notification (required).
-   **type**: Type of notification, such as "Friend Request" or "Message" (required).
-   **message**: Content of the notification (required).
-   **read**: Boolean indicating if the notification has been read (default: `false`).
-   **timestamp**: Date and time of the notification (default: current date).

## Component Details (REACT)

### Handling Backend Response Messages

In the frontend, responses from the backend are properly handled to ensure the user is informed of the action's outcome via `alert` messages. This approach helps provide clear feedback to users for both successful and failed operations.

#### Example Code:

```javascript
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/users/login`,
            credentials
        );
        return response.data;
    } catch (error) {
        alert(
            error.response?.data?.message || "An error occurred during login."
        );
        return error.response?.data;
    }
};
```

## Backend Structure

### validateToken Middleware

-   We use this middleware in all the api calls that needs a user logged in
-   We send the jwt token in the header on this middleware validated the jwt token
-   If no token or validation fails to sends the corresponding error code and message and we handle and redirect to login page in front end

```javascript
const validateToken = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "No token provided! Login Again",
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to authenticate token! Login Again",
            });
        }

        req.user = user;

        next();
    });
};
```

### JWT creation

-   After creating new user or succesful login of user we create a jwt token and send it in response.

```javascript
const token = jwt.sign(
    { name: foundUser.name, id: foundUser._id },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
);
```

### Password Ecnryption (bcrypt)

-   We used bcrypt ot encrypt password
-   We created methods in the UserModel itself.
-   First method is called whenever we save a docuemnt of User Model.The pre method is called before saving so it modifies a ecnrypts in password before saving
-   In second method we are creating out own method findAndValidate which is used when we are trying to login in it finds the users and checks if the password matches

```javascript
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.statics.findAndValidate = async function (email, password) {
    const foundUser = await this.findOne({ email });
    if (!foundUser) return false;
    const validPassword = await bcrypt.compare(password, foundUser.password);
    return validPassword ? foundUser : false;
};
```

### Response Format

All API responses follow a consistent format for both success and failure scenarios to simplify error handling and data processing.

#### Success Response Format

When a request is successfully processed, the response structure is as follows:

```json
{
    "success": true,
    "message:"",
    "data": {
        // Relevant data object (e.g., user, message, etc.)
    }
}
```

#### Failure Response Format

```json
{
    "success": true,
    "message": {
        // the error message
    },
    "error": {}
}
```

## Contact

If you have any questions or suggestions, please contact:

-   Name: Mir Anas
-   Email: anasmir24@gmail.com
