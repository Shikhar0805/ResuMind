import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function AuthCard({ initialMode }) {
  // Toggle between login and register mode (or use routing when embedded on dedicated pages)
  const [mode, setMode] = useState(initialMode || "login");
  const navigate = useNavigate();
  const { handleLogin, handleRegister, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const isLogin = mode === "login";
  const buttonText = isLogin ? "Login" : "Create account";
  const toggleText = isLogin ? "Don't have an account?" : "Already have an account?";
  const toggleLink = isLogin ? "Register" : "Login";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "login") {
        await handleLogin(email, password);
        navigate("/dashboard", { replace: true });
      } else {
        await handleRegister(username, email, password);
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      // API throws error object (e.g. { message: 'Wrong password' })
      const msg = err?.message || err?.msg || (typeof err === 'string' ? err : JSON.stringify(err));
      setError(msg || 'An error occurred');
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-linear-to-b from-white/10 to-white/5 p-8 backdrop-blur-[20px] shadow-2xl">
      {/* Title */}
      <h1 className="mb-8 text-center text-4xl font-bold text-foreground">
        {isLogin ? "Login" : "Register"}
      </h1>

      {/* Form */}
      <form className="space-y-6" onSubmit={onSubmit}>
        {/* Username (Only for registration) */}
        {!isLogin && (
          <FloatingField
            label="Username"
            type="text"
            icon={<User size={18} />}
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(null); }}
            required
          />
        )}

        {/* Email field */}
        <FloatingField label="Email" type="email" icon={<Mail size={18} />} value={email} onChange={(e) => { setEmail(e.target.value); setError(null); }} required />

        {/* Password field */}
        <FloatingField label="Password" type="password" icon={<Lock size={18} />} value={password} onChange={(e) => { setPassword(e.target.value); setError(null); }} required />

        {/* Error message */}
        {error && (
          <div className="rounded-md bg-red-500/10 border border-red-400 text-red-800 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-foreground py-3 font-semibold text-background hover:shadow-lg transition-shadow disabled:opacity-50"
        >
          {loading ? "Working..." : buttonText}
        </button>

        {/* Mode toggle */}
        <p className="text-center text-sm text-foreground/70">
          {toggleText}{" "}
          <button
            type="button"
            onClick={() => {
              // If this card was rendered as a dedicated page (initialMode provided), navigate between pages.
              if (initialMode) {
                navigate(isLogin ? "/register" : "/login");
              } else {
                setMode(isLogin ? "register" : "login");
              }
            }}
            className="font-bold text-foreground hover:underline"
          >
            {toggleLink}
          </button>
        </p>
      </form>
    </div>
  );
}

// Input field with animated floating label
function FloatingField({ label, type, icon, value, onChange, required }) {
  const [isFilled, setIsFilled] = useState(Boolean(value && value.length));
  const id = useId();

  return (
    <div className="relative">
      {/* Input: use peer so label can react to focus/placeholder */}
      <input
        id={id}
        type={type}
        placeholder=" "
        value={value}
        required={required}
        onFocus={() => setIsFilled(true)}
        onBlur={(e) => setIsFilled(e.target.value.length > 0)}
        onChange={(e) => {
          setIsFilled(e.target.value.length > 0);
          onChange && onChange(e);
        }}
        className="peer w-full border-0 border-b border-foreground/10 bg-transparent px-1 pb-2 pt-5 text-foreground outline-none focus:border-foreground transition-all placeholder:text-foreground/60"
      />

      {/* Animated label: uses peer-* utilities and `isFilled` to ensure correct positioning */}
      <label
        htmlFor={id}
        className={`absolute left-1 pointer-events-none text-foreground/70 transition-all duration-150 ease-in-out ${
          isFilled ? "top-0 text-xs" : "top-5 text-base peer-focus:top-0 peer-focus:text-xs"
        }`}
      >
        {label}
      </label>

      {/* Icon */}
      <span className="absolute right-1 top-4 text-foreground/70">{icon}</span>
    </div>
  );
}
