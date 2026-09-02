import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: (
        <AuthProvider>
          <App />
        </AuthProvider>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <RouterProvider router={router} />
    </MotionConfig>
  </StrictMode>
);