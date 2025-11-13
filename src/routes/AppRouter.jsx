import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Tasks from "../pages/Tasks";
import Profile from "../pages/Profile";

export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* Layout general */}
      <div className="min-h-screen flex flex-col">

        {/* Navbar siempre visible */}
        <Navbar />

        {/* Contenido de las páginas */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          <Routes>

            {/* RUTAS PÚBLICAS */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* RUTAS PRIVADAS */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* RUTAS POR DEFECTO */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
        </main>

        {/* Footer siempre visible */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
