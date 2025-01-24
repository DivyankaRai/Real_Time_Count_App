import axios from "axios";

const API = axios.create({
  baseURL: "https://counter-backend-slw6.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");
  console.log(token)
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
