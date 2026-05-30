import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { handleLogout, loading } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="rounded-lg bg-foreground/5 p-12 shadow-lg relative">
        <button
          onClick={onLogout}
          disabled={loading}
          className="absolute top-4 right-4 rounded px-3 py-1 bg-foreground/10 hover:bg-foreground/20"
        >
          Logout
        </button>

        <h1 className="text-3xl font-bold mb-4">Welcome — Protected Landing</h1>
        <p className="text-foreground/70">This is the protected landing page after login. Customize me later.</p>
      </div>
    </div>
  );
}

export default Dashboard;
