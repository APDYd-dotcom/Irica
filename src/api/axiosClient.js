import axios from "axios";

// ONE central place that knows your Django API's address.
// Change VITE_API_URL in .env, and it updates everywhere in the app.
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Before EVERY request, attach the saved JWT token automatically
// — like stamping every letter with your ID badge without doing it by hand each time.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If a request comes back "401 Unauthorized" (token expired), try ONE time
// to use the refresh token to get a new access token, then retry the request.
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // avoid infinite retry loops

      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem("access_token", response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return axiosClient(originalRequest); // retry the original request
        } catch (refreshError) {
          // Refresh token is also invalid/expired — force logout
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
