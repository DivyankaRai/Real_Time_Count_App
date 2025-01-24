import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { io } from "socket.io-client";

const socket = io("https://counter-backend-slw6.onrender.com", {
  transports: ["websocket"], 
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    console.log("clcik")
    try {
      console.log(email, password);
      const { data } = await API.post("/auth/login", { email, password });

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.user._id);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("role", data.user.role);

      socket.connect();
      socket.emit("userConnected", data.user._id);
      console.log("User connected with ID:", data.user._id);

      setIsLoggedIn(true);
      navigate("/player");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response.data.message); 
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggedIn}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggedIn}
        />
        <button type="submit" disabled={isLoggedIn}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>} 
      </form>
    </>
  );
};

export default LoginPage;