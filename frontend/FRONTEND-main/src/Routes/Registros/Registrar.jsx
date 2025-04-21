import { useState } from "react";

export const Registrar = () => {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backenddjango-production-c48c.up.railway.app/api/register-cliente/", 
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correo,
          nombre,
          apellido,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Error al registrar");
      }

      alert("¡Registro exitoso!");
      // Podés redirigir a login o limpiar los campos si querés
      setCorreo("");
      setNombre("");
      setApellido("");
      setPassword("");
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  };

  return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Registro de Usuario
      </h2>
      
      <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-gray-600 mb-1">Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-gray-600 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="sm:col-span-2 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Registrarse
        </button>
      </form>

      <p className="text-sm text-center text-gray-500 mt-4">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="text-indigo-600 hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  </div>
);
}
