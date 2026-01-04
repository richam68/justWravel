import axios from "axios";

// Prefer env override; otherwise choose local when running on localhost, else hosted URL.
const envUrl = import.meta.env.VITE_API_BASE_URL;
const LOCAL_URL = "http://localhost:8080/v1";
const PROD_URL = "https://justwravel.onrender.com/v1";

const isBrowser = typeof window !== "undefined";
const isLocalhost =
  isBrowser && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

const API_BASE_URL = envUrl || (isLocalhost ? LOCAL_URL : PROD_URL);

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Surface server-provided message if available
      const message = error.response.data?.message || error.response.statusText;
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(new Error("Network error. Please try again."));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
