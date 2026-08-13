import { useState, useEffect, createContext, useContext } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

// This wraps your whole app (in main.jsx) so ANY component can ask
// "is someone logged in?" without passing props down through everything.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user_data");
    if (savedUser) {
      setUser(savedUser ? JSON.parse(savedUser) : { authenticated: true });
    } else if (token) {
      setUser({ authenticated: true });
    }
    setLoading(false);
  }, []);

  function login(tokens, userData) {
    if (tokens?.access) {
      localStorage.setItem("access_token", tokens.access);
    } else {
      localStorage.removeItem("access_token");
    }
    if (tokens?.refresh) {
      localStorage.setItem("refresh_token", tokens.refresh);
    } else {
      localStorage.removeItem("refresh_token");
    }
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    setUser(null);
  }

  function updateUser(updatedFields) {
    setUser((prev) => {
      const nextUser = { ...prev, ...updatedFields };
      localStorage.setItem("user_data", JSON.stringify(nextUser));
      return nextUser;
    });
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Any component can call: const { user, login, logout } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
