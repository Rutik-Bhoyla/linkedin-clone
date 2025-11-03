import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || `${BACKEND_URL}/api` });

API.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  if(token) config.headers['x-auth-token'] = token;
  return config;
});

export default API;