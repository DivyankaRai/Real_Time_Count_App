import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import API from "../api/api";
import "./RankPage.css";

const RankPage = ({ activeUsers }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const socket = io("https://counter-backend-slw6.onrender.com", {
      transports: ["websocket"],
    });

    const fetchPlayers = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("Token is missing");
          return;
        }

        const response = await API.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPlayers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching players:", error);
        setLoading(false);
      }
    };

    fetchPlayers();

    socket.connect();

    socket.on("updateRanking", (updatedPlayer) => {
      setPlayers((prevPlayers) => {
        const updatedList = prevPlayers.map((player) =>
          player._id === updatedPlayer.userId
            ? { ...player, clickCount: updatedPlayer.clickCount }
            : player
        );
        return [...updatedList].sort((a, b) => b.clickCount - a.clickCount);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='rank-container'>
      <h2>Ranking Page</h2>
      <h3>Active Users</h3>
      <ul>
        {activeUsers.length > 0 ? (
          activeUsers.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))
        ) : (
          <p>No active users</p>
        )}
      </ul>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player._id}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.clickCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankPage;
