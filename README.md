# Real-Time Dashboard Application

## Overview
A real-time dashboard application where:
- **Admins** can manage players, block users, edit/update player details, and monitor player activity.
- **Players** can click a "Banana" button to increase their count and view real-time rankings.

## Features

### Admin Features
1. **Manage Players**:
   - View a list of all registered players.
   - Edit, update, or delete player details.
   - Block or unblock players from logging in.
2. **Monitor Player Activity**:
   - See the live list of active players.
   - Monitor banana click counts in real time.

### Player Features
1. **Banana Clicking**:
   - Players can log in and click a "Banana" button to increase their click count.
2. **Real-Time Rankings**:
   - View a leaderboard showing all players sorted by their banana click count in real time.

---

## Tech Stack
- **Frontend**: React.js, React-Bootstrap
- **Backend**: Node.js,Express.js
- **Real-Time Updates**: Socket.io
- **Database**: MongoDB
- **Session Management**: sessionStorage

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd real-time-dashboard
   ```

2. Install dependencies for both the backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory and add:
     ```env
     PORT=5000
     MONGO_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_secret_key>
     ```

4. Start the development servers:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

5. Open the application in your browser at `http://localhost:3000`.

---

## Real-Time Updates Workflow

1. **Player Actions**:
   - When a player clicks the "Banana" button, a `clickBanana` event is sent to the server.
   - The server updates the player's banana count in the database and emits an `updateRankings` event.

2. **Leaderboard Updates**:
   - All connected clients (admins and players) receive the `updateRankings` event to refresh their leaderboard view in real time.

3. **Admin Monitoring**:
   - Admins receive live updates of active users and their banana click counts through `updateRankings`.

---
