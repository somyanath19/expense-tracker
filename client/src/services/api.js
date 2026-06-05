import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-ix0o.onrender.com/api",
});

export default API;