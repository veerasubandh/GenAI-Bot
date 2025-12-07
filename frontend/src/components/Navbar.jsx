import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { getInitialTheme, applyThemeToDocument } from "../utils/theme";

export default function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    applyThemeToDocument(theme);
    localStorage.setItem("finai_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navLinkBase = "hover:text-primary transition text-sm";
  const isActive = (path) =>
    location.pathname === path ? "text-primary font-semibold" : "text-gray-700 dark:text-gray-200";

  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center bg-white/80 backdrop-blur shadow-sm fixed top-0 z-50 dark:bg-slate-900/80">
      <h1 className="text-2xl font-bold text-primary">FinAI</h1>

      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className={`${navLinkBase} ${isActive("/")}`}>Home</Link>
        <Link to="/faq" className={`${navLinkBase} ${isActive("/faq")}`}>FAQ</Link>
        <Link to="/chat" className={`${navLinkBase} ${isActive("/chat")}`}>Start Chatbot</Link>
        <Link
          to="/signup"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition text-sm"
        >
          Sign Up
        </Link>

        <button
          onClick={toggleTheme}
          className="ml-3 p-2 rounded-full border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          title="Toggle theme"
        >
          {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}
