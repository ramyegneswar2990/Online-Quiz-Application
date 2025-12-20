# Online Quiz Application

A full-stack MERN (MongoDB, Express.js, React, Node.js) platform that enables students to take online quizzes, track their progress, and lets administrators manage courses, questions, users, and analytics.

> **Live Repository:** https://github.com/ramyegneswar2990/Online-Quiz-Application

---

## Table of Contents
1. [Key Features](#key-features)
2. [Architecture Overview](#architecture-overview)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Setup & Installation](#setup--installation)
6. [Environment Variables](#environment-variables)
7. [Running the App](#running-the-app)
8. [API Reference](#api-reference)
9. [Screenshots](#screenshots)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)

---

## Key Features
- 🔐 **Role-based authentication** for users and admins with JWT.
- 🧑‍🏫 **Admin console** to manage quizzes, topics, questions, users, and quiz scores.
- 📝 **Dynamic quiz engine** with categorized questions and per-topic scoring.
- 📊 **Analytics dashboard** highlighting user performance, leaderboard, and quiz history.
- 🏅 **Certificate generator** for learners scoring above the eligibility threshold.
- ⚙️ **RESTful API** secured with middleware for CRUD operations.
- 🌐 **CORS-configured backend** ready for multiple frontend origins.

---

## Architecture Overview
```
┌──────────┐      HTTPS       ┌───────────────┐      MongoDB Atlas
│ React UI │  <────────────>  │  Express API  │  <─>  Collections
└──────────┘                   └───────────────┘        (Users, Admins,
    Vite SPA                        Node.js              Results, Courses)
```
- Frontend served via Vite + React with client-side routing.
- Backend Node.js/Express REST API connecting to MongoDB.
- JWT tokens stored client-side for authenticated requests.

---

## Tech Stack
| Layer      | Technologies |
|------------|--------------|
| Frontend   | React, Vite, React Router, Axios |
| Backend    | Node.js, Express.js |
| Database   | MongoDB Atlas with Mongoose ODM |
| Auth       | JWT, bcrypt |
| Deployment | Render / Netlify / Vercel ready (one config at a time) |

---

## Project Structure
```
Online-Quiz-Application/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── server.js
│   ├── package.json
│   └── .env (local)
├── frontned/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   ├── package.json
│   └── .env (local)
└── README.md (this file)
```
> ✅ Only **one** README is maintained in the repository root to avoid duplication.

---

## Setup & Installation
1. **Clone the repo**
   ```bash
   git clone https://github.com/ramyegneswar2990/Online-Quiz-Application.git
   cd Online-Quiz-Application
   ```
2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```
3. **Install frontend dependencies**
   ```bash
   cd ../frontned
   npm install
   ```

---

## Environment Variables
Create `.env` files inside both backend and frontend directories.

### Backend `.env`
```
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret
CORS_WHITELIST=http://localhost:5173,http://localhost:3000
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000
```

---

## Running the App
### Development mode
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontned
npm run dev
```
- Frontend default port: **5173**
- Backend default port: **5000**

---

## API Reference
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/admin/register` | Register admin |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/users` | Fetch all users |
| DELETE | `/api/admin/users/:id` | Remove a user |
| GET | `/api/admin/quiz-scores` | Aggregated user quiz scores |
| GET | `/certificate/:username/:courseName` | Generate course completion certificate |

> See `/backend/src/routes` for the rest of the endpoints.

---

## Screenshots
Screenshots are stored under `docs/screenshots/`. Save the PNG files using the names below so they render automatically:

| Feature | File Name | Preview |
|---------|-----------|---------|
| Learner Dashboard | `docs/screenshots/01-user-dashboard.png` | ![Learner Dashboard](docs/screenshots/01-user-dashboard.png) |
| Quiz Attempt (Computer Network) | `docs/screenshots/02-quiz-attempt.png` | ![Quiz Attempt](docs/screenshots/02-quiz-attempt.png) |
| Admin Dashboard | `docs/screenshots/03-admin-dashboard.png` | ![Admin Dashboard](docs/screenshots/03-admin-dashboard.png) |
| Course Management | `docs/screenshots/04-course-management.png` | ![Course Management](docs/screenshots/04-course-management.png) |
| Catalog View | `docs/screenshots/05-course-catalog.png` | ![Course Catalog](docs/screenshots/05-course-catalog.png) |

> Tip: simply copy the PNGs provided in the `/docs/screenshots` folder (or drag them into that folder) and keep the same file names.

---

## Troubleshooting
- **CORS errors**: make sure `CORS_WHITELIST` includes your frontend origin.
- **Port already in use**: stop existing Node processes using `netstat -ano` then `taskkill /PID <id> /F`.
- **Certificate not generated**: ensure quiz scores meet eligibility (>= 75%).

---

## Contributing
1. Fork the repo
2. Create a feature branch `git checkout -b feature/amazing-feature`
3. Commit changes `git commit -m "feat: add amazing feature"`
4. Push branch and open a Pull Request

---

Made with ❤️ to simplify quiz management and learning outcomes.
