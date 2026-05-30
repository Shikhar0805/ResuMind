import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import { Moon, Sun, Home } from "lucide-react";
import { AuthCard } from "../components/AuthCard";

export function Register() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden dark:bg-black bg-white">
      {/* Abstract background */}
      <div className="absolute inset-0" aria-hidden>
        {/* Large circles - white in dark, gray in light */}
        <div className="absolute -top-40 -right-40 w-96 h-96 dark:bg-white bg-gray-900 rounded-full opacity-5" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 dark:bg-white bg-gray-900 rounded-full opacity-5" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 dark:bg-white bg-gray-900 rounded-full opacity-5" />
        
        {/* Abstract lines/waves */}
        <div className="absolute inset-0 dark:opacity-3 opacity-3" style={{
          backgroundImage: 'linear-gradient(45deg, transparent 48%, currentColor 49%, currentColor 51%, transparent 52%)',
          backgroundSize: '80px 80px',
          color: 'white'
        }} />
        
        {/* Diagonal stripes */}
        <div className="absolute inset-0 dark:opacity-2 opacity-2" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)',
          color: 'white'
        }} />
      </div>

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 md:px-14">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 font-semibold text-background shadow-lg transition-transform hover:scale-105"
          aria-label="Go home"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Home</span>
        </button>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="grid h-10 w-10 place-items-center rounded-xl bg-foreground text-background shadow-lg transition-transform hover:scale-105"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Auth Form */}
      <section className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)]">
        <AuthCard initialMode="register" />
      </section>
    </main>
  );
}
