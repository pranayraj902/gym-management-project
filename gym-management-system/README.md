# Gym Management System

This project is a comprehensive Gym Management System built using React for the frontend, Node.js and Express for the backend, and MySQL as the database. The application allows gym administrators to manage members, trainers, sessions, payments, equipment, attendance, feedback, and generate reports.

## Features

- **Member Management**: Add, edit, and view member details.
- **Trainer Management**: Manage trainer information and performance.
- **Session Management**: Create and manage workout sessions.
- **Payment Processing**: Handle payments and view payment history.
- **Equipment Management**: Track gym equipment and maintenance logs.
- **Attendance Tracking**: Log member check-ins and check-outs.
- **Feedback System**: Collect and manage feedback from members.
- **Reporting**: Generate various reports for revenue, membership, and trainer performance.

## Project Structure

```
gym-management-system
├── client                # Frontend application
│   ├── public            # Public files
│   ├── src               # Source files
│   ├── package.json      # Client dependencies
│   └── .env              # Client environment variables
├── server                # Backend application
│   ├── config            # Configuration files
│   ├── controllers       # Request handlers
│   ├── routes            # API routes
│   ├── models            # Database models
│   ├── middleware        # Middleware functions
│   ├── utils             # Utility functions
│   ├── server.js         # Entry point for the server
│   ├── package.json      # Server dependencies
│   └── .env              # Server environment variables
├── database              # Database schema
│   └── schema.sql        # SQL schema for MySQL
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js
- MySQL
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd gym-management-system
   ```

2. Set up the backend:
   - Navigate to the `server` directory:
     ```
     cd server
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file and configure your database connection.

3. Set up the frontend:
   - Navigate to the `client` directory:
     ```
     cd ../client
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file for client-side environment variables.

4. Run the application:
   - Start the backend server:
     ```
     cd server
     node server.js
     ```
   - Start the frontend application:
     ```
     cd ../client
     npm start
     ```

## Usage

- Access the application in your browser at `http://localhost:3000`.
- Use the navigation to manage members, trainers, sessions, payments, equipment, attendance, and feedback.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.