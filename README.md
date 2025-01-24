# Real-Time Dashboard Application

## Overview
A real-time dashboard application where:
- **Admins** can manage players, block users, edit/update player details, and monitor player activity.
- **Players** can click a "Banana" button to increase their count and view real-time rankings.

#### Deployed Link : https://github.com/DivyankaRai/Real_Time_Count_App
## Features

### Admin Features
1. **Manage Players**:
   - View a list of all registered players.
   - Edit, update, or delete player details.
   - Block or unblock players from logging in.
2. **Monitor Player Activity**:
   - See the live list of active players.
   - Monitor banana click counts in real-time.

### Player Features
1. **Banana Clicking**:
   - Players can log in and click a "Banana" button to increase their click count.
2. **Real-Time Rankings**:
   - View a leaderboard showing all players sorted by their banana click count in real-time.

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

---

### Real-Time Updates Workflow

1. **Player Actions**:
   - When a player clicks the "Banana" button, a `clickBanana` event is sent to the server.
   - The server updates the player's banana count in the database and emits an `updateRankings` event.

2. **Leaderboard Updates**:
   - All connected clients (admins and players) receive the `updateRankings` event to refresh their leaderboard view in real time.

3. **Admin Monitoring**:
   - Admins receive live updates of active users and their banana click counts through `updateRankings`.

---


### Attaching some screenshots of the Real-Time Dashboard Application below:



**Register Page**:

![Screenshot (1198)](https://github.com/user-attachments/assets/14b390c4-045f-4460-97fd-b694c378a5d0)




**Login Page**:

![Screenshot (1196)](https://github.com/user-attachments/assets/4b95c110-006b-40f3-aa79-0559c6073aaf)





**Player Dashboard Page**:

![Screenshot (1199)](https://github.com/user-attachments/assets/1f3f770d-03ac-46e6-b518-7d3fc08fd910)




**Ranking Page**:

![Screenshot (1200)](https://github.com/user-attachments/assets/63baf575-3b3c-451d-8f28-8e7caf352c5c)




**Admin Dashboard Page**:

![Screenshot (1201)](https://github.com/user-attachments/assets/e59c5187-a8c3-4055-b837-c635b61be9c0)




**Edit User Page**:

![Screenshot (1202)](https://github.com/user-attachments/assets/bc6c6711-5864-43be-a9a0-c11c23c95d99)
