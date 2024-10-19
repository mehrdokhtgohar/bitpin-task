import axios from "axios";
import { URLS } from "./urls";

const axiosInstance = axios.create({
  baseURL: URLS.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
