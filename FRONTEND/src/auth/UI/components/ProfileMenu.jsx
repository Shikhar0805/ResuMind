import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProfileMenu() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const onSignOut = async () => {
    await handleLogout();
    navigate('/login', { replace: true });
  };

  const isHome = location.pathname === '/';

  if (!user) return null;

  const username = user.username || user.name || user.email || 'User';
  const initial = username.charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-10 w-10 rounded-full bg-foreground/90 text-background flex items-center justify-center font-semibold shadow-lg"
        aria-label="Open profile menu"
      >
        {initial}
      </button>

      {open && (
        <div className="mt-2 w-48 right-0 absolute bg-white dark:bg-black border rounded shadow-lg overflow-hidden">
          {!isHome && (
            <div className="px-4 py-3 border-b">
              <div className="font-semibold truncate">{username}</div>
              <div className="text-xs text-foreground/60">Signed in</div>
            </div>
          )}

          {!isHome && (
            <button
              onClick={() => {
                setOpen(false);
                navigate('/all-reports');
              }}
              className="w-full text-left px-4 py-2 hover:bg-foreground/5"
            >
              View reports
            </button>
          )}

          <button
            onClick={onSignOut}
            className="w-full text-left px-4 py-2 hover:bg-foreground/5 text-red-600"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}