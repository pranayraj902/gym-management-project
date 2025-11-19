# Registration System Setup Instructions

## Complete Registration System Created! 🎉

### What's Been Created:

#### Backend Files:
1. **database/create_users_table.sql** - SQL script to create users table
2. **server/models/userModel.js** - User data model with CRUD operations
3. **server/controllers/authController.js** - Authentication logic (register, login, logout)
4. **server/routes/authRoutes.js** - Auth API endpoints
5. **server/middleware/auth.js** - Updated JWT authentication middleware

#### Frontend Files:
1. **client/src/pages/Register.jsx** - Registration form page
2. **client/src/pages/Login.jsx** - Updated with real backend authentication
3. **client/src/App.jsx** - Added register route
4. **client/src/styles/Login.css** - Updated with new styles

---

## Setup Steps:

### Step 1: Install Required NPM Packages

Run these commands in your **server** directory:

```powershell
cd "C:\Users\DELL\OneDrive\Desktop\Gym Management Project\gym-management-system\server"
npm install bcrypt jsonwebtoken
```

**Packages:**
- `bcrypt` - For secure password hashing
- `jsonwebtoken` - For JWT token generation and verification

### Step 2: Create Users Table in Database

Run the SQL script to create the users table:

```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p"3011@2005" gym_management_system < "C:\Users\DELL\OneDrive\Desktop\Gym Management Project\gym-management-system\database\create_users_table.sql"
```

Or manually in MySQL:

```sql
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'staff', 'trainer') DEFAULT 'staff',
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

### Step 3: Restart Backend Server

```powershell
cd "C:\Users\DELL\OneDrive\Desktop\Gym Management Project\gym-management-system\server"
node server.js
```

### Step 4: Restart Frontend (if needed)

```powershell
cd "C:\Users\DELL\OneDrive\Desktop\Gym Management Project\gym-management-system\client"
npm start
```

---

## How to Use:

### Register New User:
1. Navigate to `http://localhost:3000/register`
2. Fill in all fields:
   - Full Name
   - Username (min 3 characters)
   - Email
   - Password (min 6 characters)
   - Confirm Password
   - Select Role (Admin/Staff/Trainer)
3. Click "Register"
4. You'll be redirected to login page after successful registration

### Login:
1. Navigate to `http://localhost:3000/login`
2. Enter registered email and password
3. Click "Login"
4. You'll be redirected to dashboard

### Features:
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication (24-hour expiry)
- ✅ Username and email uniqueness validation
- ✅ Password strength validation (min 6 characters)
- ✅ Password confirmation matching
- ✅ Role-based registration (Admin, Staff, Trainer)
- ✅ Protected routes with JWT middleware
- ✅ Token stored in localStorage
- ✅ User data stored in localStorage
- ✅ Auto-redirect after login/register
- ✅ Responsive error messages
- ✅ Link to switch between Login/Register pages

---

## API Endpoints:

### Public Routes:
- `POST /api/auth/register` - Register new user
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "full_name": "John Doe",
    "role": "staff"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Protected Routes (require JWT token):
- `GET /api/auth/user` - Get current user info
- `POST /api/auth/logout` - Logout user

---

## Security Features:

1. **Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds
2. **JWT Tokens**: 24-hour expiring tokens for session management
3. **Input Validation**: Both frontend and backend validation
4. **Unique Constraints**: Username and email must be unique
5. **Protected Routes**: Middleware checks JWT token validity
6. **Status Checking**: Inactive accounts cannot login

---

## Testing:

### Test Registration:
1. Go to register page
2. Create a new account with all details
3. Check for success message
4. Verify redirect to login page

### Test Login:
1. Use registered credentials
2. Check token is stored in localStorage
3. Verify redirect to dashboard
4. Check protected routes are accessible

### Test Protected Routes:
1. Clear localStorage (logout)
2. Try accessing `/members` or other pages
3. Should redirect to login page
4. Login and try again - should work

---

## Troubleshooting:

### "Email already registered" error:
- Email must be unique, try different email

### "Username already taken" error:
- Username must be unique, try different username

### "Token expired" error:
- Token expires after 24 hours, login again

### Backend connection error:
- Make sure MySQL is running
- Check database credentials
- Verify server is running on port 5000

### Packages not found error:
- Run `npm install bcrypt jsonwebtoken` in server folder
- Restart server after installation

---

## Next Steps:

You can now:
1. Register multiple users with different roles
2. Login with any registered user
3. Use the system with proper authentication
4. Add role-based access control (admin-only features)
5. Add password reset functionality
6. Add email verification
7. Add "Remember Me" functionality

---

Enjoy your new registration system! 🚀
