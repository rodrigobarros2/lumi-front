import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
});

export { http };
