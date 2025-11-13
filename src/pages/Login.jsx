import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";
import Loading from "../../components/Loading";

export default function Login() {
  const navigate = useNavigate();

  const { values, onChange, reset } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validaciones
    if (!values.username.trim() || !values.password.trim()) {
      setErrorMsg("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        if (res.status === 400 || res.status === 401) {
          setErrorMsg("Credenciales incorrectas.");
        } else {
          setErrorMsg("Error en el servidor.");
        }
        return;
      }

      // Login completado
      reset();
      navigate("/home", { replace: true });

    } catch (error) {
      setErrorMsg("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow">

      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

      {errorMsg && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
          {errorMsg}
        </div>
      )}

      {/* Loading */}
      {loading && <Loading label="Ingresando..." />}

      {/* Formulario */}
      {!loading && (
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Usuario
            </label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Tu usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Ingresar
          </button>
        </form>
      )}

      {/* Link a Register */}
      <p className="text-center text-sm mt-4">
        ¿No tenés cuenta?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-600 underline cursor-pointer"
        >
          Crear cuenta
        </span>
      </p>
    </section>
  );
}
