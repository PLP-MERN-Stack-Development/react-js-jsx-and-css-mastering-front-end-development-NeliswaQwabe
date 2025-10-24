import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Tasks from "./pages/Tasks.jsx";
import ApiData from "./pages/ApiData.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
          <header className="w-full shadow-md bg-gradient-to-r from-blue-600 to-indigo-700 fixed top-0 z-50">
            <Navbar />
          </header>

          <main className="flex-grow pt-24 p-6 flex justify-center">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-500">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/api-data" element={<ApiData />} />
              </Routes>
            </div>
          </main>

          <footer className="text-center py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-inner">
            <p>&copy; {new Date().getFullYear()} MyReactApp. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}
