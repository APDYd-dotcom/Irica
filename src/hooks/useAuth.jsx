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
    if (token) {
      setUser({ authenticated: true });
    }
    setLoading(false);
  }, []);

  function login(tokens, userData) {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  }

  function updateUser(updatedFields) {
    setUser((prev) => ({ ...prev, ...updatedFields }));
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
