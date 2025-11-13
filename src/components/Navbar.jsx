import { useNavigate } from "react-router";
import { useState } from "react";

export default function Navbar({ isAuth, onLogout }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <h1
          onClick={() => go("/")}
          className="font-bold text-lg cursor-pointer select-none"
        >
          TPI React
        </h1>

        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          <span className="text-xl">☰</span>
        </button>

        <nav className="hidden md:flex gap-6 items-center">
          {isAuth ? (
            <>
              <button onClick={() => go("/home")} className="hover:underline">Home</button>
              <button onClick={() => go("/tasks")} className="hover:underline">Tasks</button>
              <button onClick={() => go("/profile")} className="hover:underline">Profile</button>

              <button
                onClick={onLogout}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => go("/login")} className="hover:underline">Login</button>
              <button onClick={() => go("/register")} className="hover:underline">Register</button>
            </>
          )}
        </nav>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t bg-white animate-fade">
          {isAuth ? (
            <>
              <button onClick={() => go("/home")} className="text-left hover:underline">Home</button>
              <button onClick={() => go("/tasks")} className="text-left hover:underline">Tasks</button>
              <button onClick={() => go("/profile")} className="text-left hover:underline">Profile</button>

              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => go("/login")} className="text-left hover:underline">Login</button>
              <button onClick={() => go("/register")} className="text-left hover:underline">Register</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
