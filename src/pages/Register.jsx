import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import Loading from "../components/Loading";

export default function Register() {
  const navigate = useNavigate();

  const { values, onChange, reset } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateForm = () => {
    for (const key in values) {
      if (!values[key].trim()) {
        return `El campo ${key} es obligatorio.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        if (res.status === 400) {
          setErrorMsg("Datos inválidos o usuario ya existente.");
        } else {
          setErrorMsg("Error en el servidor.");
        }
        return;
      }

      // Registro completado
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

      <h2 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h2>

      {/* Error visual */}
      {errorMsg && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
          {errorMsg}
        </div>
      )}

      {/* Loading */}
      {loading && <Loading label="Creando cuenta..." />}

      {/* Formulario */}
      {!loading && (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">Usuario</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Elegí un usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="email@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="firstname"
              value={values.firstname}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Apellido</label>
            <input
              type="text"
              name="lastname"
              value={values.lastname}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Tu apellido"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">DNI</label>
            <input
              type="text"
              name="dni"
              value={values.dni}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Tu DNI"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Registrarme
          </button>
        </form>
      )}

      {/* Link a Login */}
      <p className="text-center text-sm mt-4">
        ¿Ya tenés cuenta?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-600 underline cursor-pointer"
        >
          Iniciar sesión
        </span>
      </p>
    </section>
  );
}
