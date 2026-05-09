# 🎓 Course Feedback Portal

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Prisma](https://img.shields.io/badge/ORM-Prisma-black)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-Educational-red)

---

# 📌 Project Overview

The **Course Feedback Portal** is a modern full-stack web application developed to simplify and improve the process of collecting course feedback in educational institutions.

The platform allows students to browse courses, submit ratings and feedback, and helps administrators manage course-related information efficiently. The project focuses on creating a responsive, scalable, and secure application using modern web development technologies.

This project demonstrates real-world full-stack development concepts including:

- REST API development
- Frontend and backend integration
- Authentication and authorization
- Database management
- Responsive UI/UX design
- Scalable project architecture
- Secure user handling

---

# 🎯 Objectives

- Develop a centralized system for course feedback collection
- Allow students to submit ratings and comments for courses
- Help institutions analyze course performance effectively
- Build a secure authentication-based platform
- Implement scalable backend architecture using Prisma ORM
- Improve user experience through responsive UI design
- Practice industry-standard full-stack development workflows

---

# ✅ Assignment Requirements Covered

## Backend Requirements

- RESTful API development using Node.js and Express.js
- PostgreSQL database integration using Prisma ORM
- CRUD operations for course management
- Feedback submission and retrieval APIs
- Authentication and authorization system
- Secure password encryption using bcryptjs
- Input validation using Express Validator
- Organized backend architecture

---

## Frontend Requirements

- Responsive React-based UI
- Course listing interface
- Course detail pages
- Feedback submission forms
- Login and registration pages
- Dynamic API integration using Axios
- Responsive dashboard layouts
- User-friendly navigation system

---

## Additional Improvements Implemented

- JWT-based authentication
- Protected routes
- Reusable React components
- Clean folder architecture
- Error handling middleware
- Validation and secure API handling
- Improved UI/UX responsiveness

---

# ✨ Key Features

## 👨‍🎓 Student Features

- Browse all available courses
- View detailed course information
- Submit ratings and comments
- View feedback and reviews
- Secure authentication system
- Responsive dashboard interface

---

## 👨‍💼 Admin Features

- Add new courses
- Update existing course information
- Delete course records
- Manage feedback system
- Maintain course database

---

## 🔐 Authentication Features

- JWT token-based authentication
- Secure login and registration
- Password hashing using bcryptjs
- Protected backend routes
- Session management

---

## 📊 Feedback System

- Course-wise feedback management
- Rating system (1–5)
- Comment-based review system
- Real-time data handling
- Database relationship mapping

---

# 🌍 Real-World Impact

Educational institutions often face difficulties in collecting structured and meaningful feedback from students. This platform provides a centralized and efficient solution where students can easily share their experiences while administrators can monitor and improve course quality.

The project demonstrates how modern full-stack technologies can solve real-world educational management challenges through scalable and secure web applications.

---

# 🛠 Tech Stack

## Frontend Technologies

| Technology | Purpose |
|---|---|
| React 19 | Frontend UI Library |
| Vite | Fast Build Tool |
| React Router DOM | Client-side Routing |
| Axios | API Communication |
| Lucide React | Icons |
| CSS | Styling & Responsive Layout |

---

## Backend Technologies

| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| Prisma ORM | Database ORM |
| PostgreSQL | Relational Database |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Express Validator | Validation |
| Morgan | Request Logging |
| CORS | Cross-Origin Requests |

---

# 🧱 System Architecture

```text
Frontend (React + Vite)
          │
          ▼
REST API (Node.js + Express.js)
          │
          ▼
Prisma ORM
          │
          ▼
PostgreSQL Database
```

---

# 📂 Project Structure

```bash
course-feedback-portal/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── prisma/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── README.md
└── .gitignore
```

---

# 📦 Frontend Dependencies

```json
{
  "axios": "^1.16.0",
  "lucide-react": "^1.14.0",
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-router-dom": "^7.15.0"
}
```

---

# 📦 Backend Dependencies

```json
{
  "@prisma/adapter-pg": "^7.8.0",
  "@prisma/client": "^7.8.0",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "express-validator": "^7.3.2",
  "jsonwebtoken": "^9.0.3",
  "morgan": "^1.10.1",
  "pg": "^8.20.0",
  "prisma": "^7.8.0"
}
```

---

# 🚀 Available Commands

## Frontend Commands

Run these commands inside the `/frontend` directory.

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

---

# ⚙️ Backend Commands

Run these commands inside the `/backend` directory.

### Install dependencies

```bash
npm install
```

### Start backend server

```bash
npm run dev
```

### Start production server

```bash
npm start
```

### Run Prisma migrations

```bash
npm run migrate
```

### Generate Prisma client

```bash
npm run generate
```

### Seed database

```bash
npm run seed
```

---

# 🏁 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/course-feedback-portal.git
```

---

## 2️⃣ Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

DATABASE_URL="postgresql://username:password@localhost:5432/course_feedback"

JWT_SECRET=your_jwt_secret
```

Run database migrations:

```bash
npm run migrate
```

Generate Prisma client:

```bash
npm run generate
```

Seed database:

```bash
npm run seed
```

Start backend server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start frontend server:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔌 API Endpoints

## Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |

---

## Course Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/:id` | Get single course |
| POST | `/api/courses` | Add course |
| PUT | `/api/courses/:id` | Update course |
| DELETE | `/api/courses/:id` | Delete course |

---

## Feedback Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/feedback` | Get all feedback |
| POST | `/api/feedback` | Submit feedback |
| GET | `/api/feedback/course/:id` | Get feedback by course |

---

# 📡 Sample API Response

## GET `/api/courses`

```json
{
  "success": true,
  "courses": [
    {
      "id": 1,
      "courseName": "Database Management Systems",
      "instructorName": "Dr. Sharma",
      "credits": 4
    }
  ]
}
```

---

# 🗄️ Database Schema

## User Table

| Field | Type |
|---|---|
| id | Integer / UUID |
| name | String |
| email | String |
| password | String |

---

## Course Table

| Field | Type |
|---|---|
| id | Integer / UUID |
| courseName | String |
| instructorName | String |
| credits | Integer |

---

## Feedback Table

| Field | Type |
|---|---|
| id | Integer / UUID |
| courseId | Foreign Key |
| studentName | String |
| rating | Integer |
| comments | Text |

---

# 🔒 Security Features

- JWT-based authentication
- Password hashing using bcryptjs
- Protected API routes
- Input validation middleware
- Secure environment variables using dotenv
- Request validation using Express Validator

---

# ⚡ Challenges Faced & Solutions

| Challenge | Solution |
|---|---|
| Frontend-backend communication | Implemented Axios API service structure |
| Secure authentication handling | Used JWT token authentication |
| Database schema management | Managed models using Prisma ORM |
| Validation and security | Used Express Validator middleware |
| Responsive UI design | Applied responsive CSS layouts |
| Clean project organization | Followed modular architecture |

---

# 📸 Screenshots

## 🏠 Home Dashboard


![Home Page](./screenshots/home.png)


---

## 🔐 Login Page


![Login Page](./screenshots/login.png)


---

## 📝 Feedback Submission Page


![Feedback Page](./screenshots/feedback.png)


---

# 🧪 Testing

Testing was performed using:

- Postman
- Thunder Client

---

## Tested Functionalities

- User authentication
- CRUD operations
- Feedback submission
- Protected routes
- API validation
- Database connectivity
- Error handling

---

# 🚀 Deployment

## Frontend Deployment

- Vercel
- Netlify

---

## Backend Deployment

- Render
- Railway

---

## Database Hosting

- PostgreSQL

The application can be deployed as a production-ready full-stack solution using cloud hosting platforms.

---

# 📈 Future Improvements

- Role-based access control
- Admin analytics dashboard
- Search and filtering
- Pagination support
- Dark mode support
- Email notifications
- AI-based sentiment analysis
- Docker support
- Real-time notifications

---

# 💡 Learning Outcomes

This project helped in understanding:

- Full-stack application development
- REST API architecture
- Authentication systems
- Prisma ORM integration
- Database relationships
- Secure backend development
- Frontend-backend integration
- React routing and state handling
- Production-level project structuring

---

# 🌟 Project Highlights

✅ Full-stack architecture  
✅ JWT authentication system  
✅ Prisma ORM integration  
✅ PostgreSQL relational database  
✅ Responsive UI design  
✅ RESTful API implementation  
✅ Secure password encryption  
✅ Scalable backend setup  
✅ Clean project architecture  
✅ Real-world educational use case  

---

# 👨‍💻 Developed By

## Aditya Pandey

B.Tech Computer Science Engineering Student  
Passionate about Full Stack Development, UI/UX Design, and Building Real-World Applications

---


