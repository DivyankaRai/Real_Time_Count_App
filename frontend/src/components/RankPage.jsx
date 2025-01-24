import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import API from "../api/api";
import "./RankPage.css";
import Loader from "./Loader";

const RankPage = () => {
  const [players, setPlayers] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
  
  
   useEffect(() => {
       const timer = setTimeout(() => setIsLoading(false), 2000);
       return () => clearTimeout(timer);
     }, []);
  
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
      } catch (error) {
        console.error("Error fetching players:", error);
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
  
  if (isLoading) {
    return <Loader />; 
  }

  return (
    <div className='rank-container'>
      <h2>Ranking Page</h2>
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
