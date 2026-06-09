import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-analyzer-orjk.onrender.com",
});

export default api;