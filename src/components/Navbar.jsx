import { Link, NavLink } from "react-router-dom";

export default function Navbar({ isAuth, onLogout }) {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* inicio */}
        <Link to="/" className="font-bold text-lg">
          TPI React
        </Link>

        {/* naveg */}
        <nav className="flex items-center gap-4">

          {isAuth ? (
            <>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "font-semibold underline" : "hover:underline"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  isActive ? "font-semibold underline" : "hover:underline"
                }
              >
                Tasks
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "font-semibold underline" : "hover:underline"
                }
              >
                Profile
              </NavLink>

              <button
                onClick={onLogout}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "font-semibold underline" : "hover:underline"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "font-semibold underline" : "hover:underline"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
