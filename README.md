# StudyBud - Smart Study Companion

StudyBud is a production-ready web application designed to help users track study time using a Pomodoro timer and provides daily, weekly, and monthly performance analytics.

## 🚀 Live Demo

- **Frontend**: [Your Vercel URL Here]
- **Backend API**: [Your Render/Fly.io URL Here]

## ✨ Features

- **Pomodoro Timer**: Customizable focus/break durations with auto-logging.
- **Smart Focus Detection**: Detects focus drops (tab switching, idle time) and adjusts focus score.
- **Analytics Dashboard**: Visual daily, weekly, and monthly reports using Recharts.
- **Authentication**: Secure JWT-based login and signup.
- **Distraction-Free UI**: Clean, responsive design with dark/light mode support.

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Recharts
- Axios
- Framer Motion

**Backend:**
- Node.js & Express
- MongoDB (Atlas)
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt.js

## 📦 Deployment Instructions

### 1. Backend Deployment (Render / Railway / Fly.io)

1.  Push the `backend` folder code to a new GitHub repository or subdirectory.
2.  Connect your repository to your hosting provider.
3.  Set the following **Environment Variables**:
    *   `NODE_ENV`: production
    *   `MONGO_URI`: Your MongoDB Atlas connection string
    *   `JWT_SECRET`: A secure random string
    *   `PORT`: 5000 (or let the provider assign one)
4.  Build Command: `npm install`
5.  Start Command: `node server.js`

### 2. Frontend Deployment (Vercel / Netlify)

1.  Push the `frontend` folder code to a GitHub repository.
2.  Import the project into Vercel/Netlify.
3.  Set the **Environment Variable**:
    *   `VITE_API_URL`: The URL of your deployed backend (e.g., `https://studybud-api.onrender.com/api`)
4.  Build Command: `npm run build`
5.  Output Directory: `dist`

## 🏃‍♂️ Running Locally

1.  **Clone the repository**
2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    cp .env.example .env
    # Add your MongoDB URI in .env
    npm run dev
    ```
3.  **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.

## 📝 API Documentation

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user and get token
- `POST /api/sessions`: Save a completed study session
- `GET /api/sessions`: Get all user sessions
- `GET /api/stats/daily`: Get today's stats
- `GET /api/stats/weekly`: Get last 7 days stats
- `GET /api/stats/monthly`: Get last 30 days stats

## 📄 License

MIT