import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");

    // Try immediate find, otherwise retry shortly for mounted content
    const scrollToId = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (!scrollToId()) {
      const t = setTimeout(() => {
        scrollToId();
      }, 60);
      return () => clearTimeout(t);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-parchment">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
