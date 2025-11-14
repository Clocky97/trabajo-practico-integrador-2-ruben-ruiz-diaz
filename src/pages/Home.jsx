import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        //Cargar datos del usuario
        const profileRes = await fetch("/api/profile", {
          credentials: "include",
        });

        if (!profileRes.ok) {
          setErrorMsg("No se pudo cargar el usuario.");
          setLoading(false);
          return;
        }

        const profileData = await profileRes.json();
        if (isMounted) setUser(profileData.user || profileData);

        // cargar tareas del usuario
        const tasksRes = await fetch("/api/tasks-by-user", {
          credentials: "include",
        });

        if (!tasksRes.ok) {
          setErrorMsg("No se pudieron cargar las tareas.");
          setLoading(false);
          return;
        }

        const tasksData = await tasksRes.json();
        if (isMounted) setTasks(tasksData);

      } catch (error) {
        if (isMounted) {
          setErrorMsg("Error al conectarse con el servidor.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Loading general
  if (loading) return <Loading label="Cargando inicio..." />;

  // estadisticas
  const total = tasks.length;
  const completed = tasks.filter((t) => t.is_completed).length;
  const pending = total - completed;

  return (
    <section>

      <h1 className="text-3xl font-bold mb-4 bg-dark-blue-50 p-4 rounded">
        ¡Hola, {user?.firstname}!
      </h1>

      {/* error */}
      {errorMsg && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
          {errorMsg}
        </div>
      )}

      {/* estadisticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-dark-blue-50 p-4 rounded">

        <div className="p-4 bg-white shadow rounded text-center bg">
          <h2 className="text-xl font-semibold">Total de tareas</h2>
          <p className="text-2xl mt-2">{total}</p>
        </div>

        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold">Completadas</h2>
          <p className="text-2xl mt-2 text-green-600">{completed}</p>
        </div>

        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold">Pendientes</h2>
          <p className="text-2xl mt-2 text-red-600">{pending}</p>
        </div>

      </div>

      {/* Botón hacia Tasks */}
      <button
        onClick={() => navigate("/tasks")}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Ver mis tareas
      </button>

    </section>
  );
}
