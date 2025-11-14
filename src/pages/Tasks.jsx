import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useForm } from "../hooks/useForm";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // estado de crear o editar
  const { values, onChange, reset, setValues } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [editingId, setEditingId] = useState(null); // null = creando, no editando
  const [saving, setSaving] = useState(false);

  // cargar tareas del usuario
  const loadTasks = async () => {
    setLoadingTasks(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/tasks-by-user", {
        credentials: "include",
      });

      if (!res.ok) {
        setErrorMsg("Error al cargar las tareas.");
        setLoadingTasks(false);
        return;
      }

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      setErrorMsg("No se pudo conectar con el servidor.");
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que querés eliminar esta tarea?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        alert("Error al eliminar la tarea.");
        return;
      }
        // recargar lista
      await loadTasks();

    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  };


  return (
    <section className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">Mis Tareas</h1>

      {/* por las dudas si sale error */}
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMsg}
        </div>
      )}

      {/* Loading */}
      {loadingTasks ? (
        <Loading label="Cargando tareas..." />
      ) : (
        <>
          {/* si es que no hay tareas */}
          {tasks.length === 0 ? (
            <p className="text-gray-600">No tenés tareas aún.</p>
          ) : (
            <ul className="space-y-3 mb-6">
              {tasks.map((task) => (
                <li key={task.id} className="p-4 bg-white shadow rounded flex justify-between">
                  <div>
                    <h3 className={`text-lg font-semibold ${task.is_completed ? "line-through text-gray-400" : ""}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => {
                        // prellenar form para editar
                        setEditingId(task.id);
                        setValues(task);
                      }}
                    >
                      Editar
                    </button>

                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => handleDelete(task.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* crear o edita formulario */}
      <TaskForm
        values={values}
        onChange={onChange}
        reset={reset}
        saving={saving}
        editingId={editingId}
        setEditingId={setEditingId}
        loadTasks={loadTasks}
        setSaving={setSaving}
      />
    </section>
  );
}

/* componente "formulario"" separado*/
function TaskForm({
  values,
  onChange,
  reset,
  saving,
  editingId,
  setEditingId,
  loadTasks,
  setSaving,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.title.trim()) {
      alert("El título es obligatorio.");
      return;
    }

    setSaving(true);

    try {
      const url = editingId ? `/api/tasks/${editingId}` : "/api/tasks";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        alert("Error al guardar la tarea.");
        return;
      }

      // recargar lista
      await loadTasks();

      // resetear form
      reset();
      setEditingId(null);

    } catch (error) {
      alert("Error de conexión.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-4">
      <h2 className="text-xl font-bold">
        {editingId ? "Editar tarea" : "Crear tarea"}
      </h2>

      <div>
        <label className="block text-sm">Título</label>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">Descripción</label>
        <textarea
          name="description"
          value={values.description}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_completed"
          checked={values.is_completed}
          onChange={onChange}
        />
        <span className="text-sm">¿Completada?</span>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {saving ? "Guardando..." : editingId ? "Guardar cambios" : "Crear tarea"}
      </button>
    </form>
  );
}
