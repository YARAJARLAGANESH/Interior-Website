# Portfolio Admin Backend

Node.js/Express backend API for the portfolio admin panel with JWT authentication and MongoDB integration.

## Setup Instructions

### 1. Create a MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add a database user with username and password
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and fill in:

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

Replace:
- `username` and `password` with your MongoDB Atlas credentials
- `cluster` with your cluster name
- `dbname` with your database name
- `JWT_SECRET` with a securely generated random string

### 4. Create Initial Admin User

Run this once to add an admin user:

```bash
node scripts/createAdmin.js
```

Or use the `/api/auth/register` endpoint:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### 5. Start the Server

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login admin user
- `POST /api/auth/register` - Register new admin user

### Projects (Public)

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project

### Projects (Protected - Admin Only)

- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## File Uploads

- Images stored in: `/uploads/images`
- Videos stored in: `/uploads/videos`

Image file size limit: 5MB each (max 10 images)
Video file size limit: 50MB

## Folder Structure

```
server/
├── config/           # Configuration files
│   └── database.js   # MongoDB connection
├── controllers/      # Route controllers
│   ├── authController.js
│   └── projectController.js
├── middleware/       # Custom middleware
│   ├── auth.js       # JWT validation
│   └── upload.js     # File upload config
├── models/          # Database schemas
│   ├── Admin.js
│   └── Project.js
├── routes/          # API routes
│   ├── authRoutes.js
│   └── projectRoutes.js
├── uploads/         # Uploaded files
│   ├── images/
│   └── videos/
├── .env             # Environment variables
├── server.js        # Main application file
└── package.json     # Dependencies
```

## Testing Endpoints

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
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

### Get All Projects

```bash
curl http://localhost:5000/api/projects
```

### Create Project (with JWT token)

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=My Project" \
  -F "description=Project description" \
  -F "category=Commercial" \
  -F "location=New York" \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg" \
  -F "video=@video.mp4"
```

## Security Notes

- Never commit `.env` file to version control
- Use strong JWT_SECRET in production
- Keep MongoDB credentials secure
- Enable authentication in MongoDB Atlas
- Use HTTPS in production
- Set NODE_ENV to 'production' in deployment

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **multer** - File uploads
- **nodemon** - Auto-restart during development
