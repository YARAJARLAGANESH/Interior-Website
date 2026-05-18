# Backend Setup Complete ✅

## Project Created: C:\Users\ganes\Desktop\server

---

## 📁 Final Folder Structure

```
server/
├── config/
│   └── database.js              # MongoDB connection config
├── controllers/
│   ├── authController.js        # Login & Register logic
│   └── projectController.js     # CRUD operations for projects
├── middleware/
│   ├── auth.js                  # JWT validation
│   └── upload.js                # File upload config
├── models/
│   ├── Admin.js                 # Admin schema & methods
│   └── Project.js               # Project schema
├── routes/
│   ├── authRoutes.js            # /api/auth endpoints
│   └── projectRoutes.js         # /api/projects endpoints
├── scripts/
│   └── createAdmin.js           # Script to seed admin user
├── uploads/
│   ├── images/                  # Uploaded project images
│   └── videos/                  # Uploaded project videos
├── .env                         # Environment variables (needs config)
├── .gitignore                   # Git ignore file
├── package.json                 # Project dependencies
├── README.md                    # Full documentation
└── server.js                    # Main application entry point
```

---

## 📦 Installed Dependencies

✅ express (4.18.2) - Web framework
✅ mongoose (8.0.0) - MongoDB ODM
✅ cors (2.8.5) - Cross-origin handling
✅ dotenv (16.3.1) - Environment variables
✅ bcryptjs (2.4.3) - Password hashing
✅ jsonwebtoken (9.0.2) - JWT authentication
✅ multer (1.4.5) - File uploads
✅ nodemon (3.0.1) - Auto-reload (dev only)

---

## 🚀 Quick Start Guide

### Step 1: Configure MongoDB

1. Create MongoDB Atlas account
2. Create a new cluster
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
4. Update `.env` file with MONGO_URI

### Step 2: Update .env File

```
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DB
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### Step 3: Create Initial Admin User

```bash
cd c:\Users\ganes\Desktop\server
node scripts/createAdmin.js
```

Credentials created:
- Email: `admin@example.com`
- Password: `admin123`
- ⚠️ Change after first login!

### Step 4: Start Server

```bash
cd c:\Users\ganes\Desktop\server
npm run dev
```

Server will run on: **http://localhost:5000**

---

## 📡 API Endpoints

### Authentication (Public)
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Create new admin user

### Projects (Public Read)
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project

### Projects (Protected - Admin Only)
- `POST /api/projects` - Create project with images/video
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Health Check
- `GET /api/health` - Server status

---

## 🔐 Authentication Flow

1. Admin submits login: `POST /api/auth/login` with email & password
2. Backend validates credentials
3. JWT token returned (expires in 7 days)
4. Frontend stores token in localStorage as `adminToken`
5. Token automatically sent in Authorization header: `Bearer {token}`
6. Protected routes validated by JWT middleware

---

## 📸 File Upload Handling

**Images:**
- Location: `/uploads/images`
- Max files: 10 per request
- Max size: 5MB each
- Formats: JPEG, PNG, GIF, WebP

**Video:**
- Location: `/uploads/videos`
- Max files: 1 per request
- Max size: 50MB
- Formats: MP4, MPEG, WebM, MOV

Files stored as: `/uploads/images/{filename}` in MongoDB

---

## ✅ Verification Checklist

- [x] npm project initialized with ES modules
- [x] All dependencies installed
- [x] MongoDB connection configured
- [x] JWT authentication middleware
- [x] File upload with multer
- [x] Admin schema with password hashing
- [x] Project schema with file support
- [x] Auth routes (login/register)
- [x] Project CRUD routes
- [x] CORS enabled for frontend ports
- [x] Static file serving for uploads
- [x] Error handling
- [x] No syntax errors
- [x] Admin seed script created

---

## 🔗 Connect Frontend to Backend

Your frontend is already configured to connect to: `http://localhost:5000/api`

The frontend has:
- ✅ JWT interceptor (auto-attach token)
- ✅ 401 error handling (redirect to login)
- ✅ Login page connected
- ✅ All admin pages connected

---

## 📝 Test Login

Once server is running:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "name": "Admin"
  }
}
```

---

## 🎯 Next Steps

1. ✅ Backend ready
2. Set up MongoDB Atlas database
3. Update `.env` with MongoDB URI
4. Run: `npm run dev` in server folder
5. Run frontend: `npm run dev` in client folder
6. Navigate to `http://localhost:5174/admin`
7. Login with admin credentials
8. Test add/edit/delete projects

---

## 📚 Full Documentation

See `README.md` in the server folder for complete API documentation and examples.
