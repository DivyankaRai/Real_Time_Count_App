import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./PlayerDashboard.css";
import API from "../api/api";

const PlayerDashboard = () => {
  const [clickCount, setClickCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://counter-backend-slw6.onrender.com", {
      transports: ["websocket"]
    });

    setSocket(newSocket);

    const fetchClickCount = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
          const { data } = await API.get(`/users/${user._id}`);
          setClickCount(data.clickCount || 0);
        }
      } catch (error) {
        console.error("Error fetching click count:", error);
      }
    };

    fetchClickCount();

    return () => {
      newSocket.close();
    };
  }, []);


  useEffect(() => {
    if (socket) {
      const user = JSON.parse(sessionStorage.getItem("user"));

      socket.on("updateRanking", (data) => {
        if (data.userId === user._id) {
          setClickCount(data.clickCount);
        }
      });

      return () => {
        socket.off("updateRanking");
      };
    }
  }, [socket]);

  const handleClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && socket) {
      try {
        socket.emit("bananaClick", { userId: user._id });
      } catch (error) {
        console.error("Error emitting click event:", error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Player Dashboard</h2>
      <div className="btn" onClick={handleClick}>
      </div>
      <p>Your click count: {clickCount}</p>
    </div>
  );
};

export default PlayerDashboard;
