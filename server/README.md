# Blitz India Engineering - Backend API

Production-grade Node.js backend API with Express and MongoDB for Blitz India Engineering website.

## Features

- **Complete Content Management**: Full CRUD operations for services, projects, blogs, and all site content
- **Admin Authentication**: Secure login with password + TOTP MFA (Google Authenticator compatible)
- **Public API**: RESTful endpoints for all public content
- **Admin Dashboard**: Statistics and content management capabilities
- **Security**: Rate limiting, CORS, helmet, input validation, and sanitization
- **Error Handling**: Centralized error handling with detailed logging
- **Database**: MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT + TOTP (speakeasy, qrcode)
- **Security**: helmet, cors, bcryptjs, express-rate-limit
- **Validation**: express-validator
- **Logging**: Winston

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. **Clone the repository** (if not already done)
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the values as needed:
     ```
     MONGODB_URI=mongodb://localhost:27017/blitz-engineering
     JWT_SECRET=your-super-secret-key
     CORS_ORIGIN=http://localhost:5173
     ```

4. **Ensure MongoDB is running**
   ```bash
   # On Windows, MongoDB should be running as a service
   # Or start it manually:
   mongod
   ```

## Database Setup

1. **Seed the database** with initial data:
   ```bash
   npm run seed
   ```
   This will populate the database with:
   - 16 services across 4 categories
   - 5 portfolio projects
   - Home, About, and Legal content
   - Site settings

2. **Create an admin user**:
   ```bash
   npm run create-admin
   ```
   Follow the prompts to create an admin account.

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/home` | Get home page content |
| GET | `/api/about` | Get about page content |
| GET | `/api/services` | Get all published services |
| GET | `/api/services/categories` | Get service categories |
| GET | `/api/services/:slug` | Get single service |
| GET | `/api/portfolio` | Get all published projects |
| GET | `/api/portfolio/:slug` | Get single project |
| GET | `/api/blogs` | Get all published blogs |
| GET | `/api/blogs/:slug` | Get single blog |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/legal/privacy` | Get privacy policy |
| GET | `/api/legal/terms` | Get terms of service |
| GET | `/api/settings/public` | Get public site settings |

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login (password + TOTP) |
| GET | `/api/auth/me` | Get current admin user |
| POST | `/api/auth/setup-mfa` | Generate TOTP QR code |
| POST | `/api/auth/verify-mfa-setup` | Enable TOTP MFA |
| POST | `/api/auth/create-admin` | Create admin (disable in production) |

### Admin Endpoints (Require Authentication)

All admin endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/PUT | `/api/admin/content/home` | Manage home content |
| GET/PUT | `/api/admin/content/about` | Manage about content |
| GET/PUT | `/api/admin/content/legal/:type` | Manage legal content |
| GET/POST/PUT/DELETE | `/api/admin/services` | Manage services |
| GET/POST/PUT/DELETE | `/api/admin/services/categories` | Manage categories |
| GET/POST/PUT/DELETE | `/api/admin/projects` | Manage projects |
| GET/POST/PUT/DELETE | `/api/admin/blogs` | Manage blogs |
| GET/PUT/DELETE | `/api/admin/contact/submissions` | Manage contact submissions |
| GET/PUT | `/api/admin/settings` | Manage site settings |
| GET | `/api/admin/dashboard/stats` | Get dashboard statistics |

## TOTP MFA Setup

1. Login to the admin panel with email and password
2. Navigate to MFA setup
3. Scan the QR code with Google Authenticator, Microsoft Authenticator, or Authy
4. Enter the 6-digit code to verify and enable MFA
5. All subsequent logins will require the TOTP code

## Security Features

- **Rate Limiting**: Prevents brute force attacks
  - Auth routes: 5 requests per 15 minutes
  - Contact form: 3 submissions per hour
  - API routes: 100 requests per 15 minutes
- **CORS**: Configured for specific origin
- **Helmet**: Security headers
- **Input Validation**: All inputs validated and sanitized
- **Password Hashing**: bcrypt with salt rounds
- **JWT**: Secure token-based authentication
- **TOTP MFA**: Two-factor authentication

## Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── auth.controller.js   # Authentication logic
│   ├── public/              # Public endpoints
│   └── admin/               # Admin endpoints
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── validate.js          # Input validation
│   ├── errorHandler.js      # Error handling
│   └── rateLimiter.js       # Rate limiting
├── models/                  # Mongoose models
├── routes/                  # Express routes
├── scripts/
│   ├── seed.js             # Database seeder
│   └── createAdmin.js      # Admin creation
├── utils/
│   ├── logger.js           # Winston logger
│   └── totp.js             # TOTP utilities
├── .env                    # Environment variables
├── .env.example            # Environment template
├── server.js               # Main server file
└── package.json            # Dependencies

```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/blitz-engineering |
| `JWT_SECRET` | JWT signing secret | (required) |
| `JWT_EXPIRES_IN` | JWT expiration | 7d |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:5173 |
| `TOTP_ISSUER` | TOTP issuer name | Blitz India Engineering |

## Logging

Logs are stored in the `logs/` directory:
- `combined.log`: All logs
- `error.log`: Error logs only

## Error Handling

All errors are handled centrally and return consistent JSON responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [/* validation errors if any */]
}
```

## Production Deployment

1. **Disable admin creation endpoint** in `routes/auth.routes.js`
2. **Set strong JWT_SECRET** in production environment
3. **Configure production MongoDB** connection
4. **Enable HTTPS** for all traffic
5. **Set appropriate CORS_ORIGIN**
6. **Configure rate limits** based on traffic
7. **Set up monitoring** and logging
8. **Regular backups** of MongoDB database

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB is accessible on the specified port

### CORS Errors
- Verify `CORS_ORIGIN` matches your frontend URL
- Check that the frontend is making requests to the correct backend URL

### Authentication Issues
- Ensure JWT_SECRET is set in `.env`
- Verify token is sent in Authorization header
- Check that TOTP code is current (time-synced)

## Support

For issues or questions, contact: info@blitzindiaengineering.com

## License

Copyright © 2024 Blitz India Engineering. All rights reserved.
