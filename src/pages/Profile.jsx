import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // obtener datos de usuario
  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const res = await fetch("/api/profile", {
          credentials: "include",
        });

        if (!isMounted) return;

        if (!res.ok) {
          setErrorMsg("Error al obtener el perfil.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data.user || data);
        setLoading(false);

      } catch (error) {
        if (isMounted) {
          setErrorMsg("No se pudo conectar con el servidor.");
          setLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    setLogoutLoading(true);

    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        navigate("/login", { replace: true });
      } else {
        setErrorMsg("Error al cerrar sesión.");
      }

    } catch (error) {
      setErrorMsg("No se pudo cerrar sesión.");
    } finally {
      setLogoutLoading(false);
    }
  };

  // Loading
  if (loading) return <Loading label="Cargando perfil..." />;

  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">

      <h2 className="text-2xl font-bold mb-4 text-center">Mi Perfil</h2>

      {/* Error */}
      {errorMsg && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
          {errorMsg}
        </div>
      )}

      {/* Datos del usuario */}
      {user && (
        <div className="space-y-2 mb-6">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Nombre:</strong> {user.firstname}</p>
          <p><strong>Apellido:</strong> {user.lastname}</p>
        </div>
      )}

      {/* Botón de Logout */}
      <button
        onClick={handleLogout}
        disabled={logoutLoading}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-60"
      >
        {logoutLoading ? "Cerrando sesión..." : "Cerrar sesión"}
      </button>
    </section>
  );
}
