import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/Login";
import RegisterPage from "./components/RegisterPage";
import AdminDashboard from "./components/AdminDashboard";
import PlayerDashboard from "./components/PlayerDashboard";
import RankingPage from "./components/RankPage";
import Navbar from "./components/Navbar";
import { io } from "socket.io-client";

const socket = io("https://counter-backend-slw6.onrender.com", {
  transports: ["websocket"],
  reconnection: true,
});

const App = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {

    socket.connect();

    const userData = sessionStorage.getItem("user");

    if (userData) {
      const data = JSON.parse(userData);
      socket.emit("userConnected", data._id);
    }

    socket.on("activeUsersList", (users) => {
      console.log("Active users received:", users);
      setActiveUsers(users)
    });

    socket.on("userDisconnected", (userId) => {
      setActiveUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/player" element={<PlayerDashboard />} />
        <Route path="/rank" element={<RankingPage activeUsers={activeUsers} />} />
      </Routes>
    </>
  );
};

export default App;
