import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  withCredentials: true, // ensure cookies (refresh token) are sent
});


// ---- Attach interceptor for refresh ----
let isRefreshing = false;
let queue: (() => void)[] = [];

const processQueue = () => {
  queue.forEach((cb) => cb());
  queue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push(() => resolve(api(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token", {}, { withCredentials: true });
        processQueue();
        return api(originalRequest);
      } catch (err) {
        // Optional: Trigger logout here if refresh fails
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
