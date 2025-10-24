import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.jsx";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/tasks", label: "Tasks" },
    { path: "/api-data", label: "API Data" },
  ];

  return (
    <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
      <h1 className="text-2xl font-bold text-white">MyReactApp</h1>
      <div className="flex items-center space-x-6 text-white font-medium">
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`relative pb-1 transition-all duration-300 ${
              location.pathname === link.path ? "text-yellow-300" : "hover:text-yellow-300"
            }`}
          >
            {link.label}
            <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-yellow-300 transform origin-left scale-x-0 transition-transform duration-300 ${
              location.pathname === link.path ? "scale-x-100" : "hover:scale-x-100"
            }`} />
          </Link>
        ))}
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow hover:scale-110 transform transition duration-300"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
