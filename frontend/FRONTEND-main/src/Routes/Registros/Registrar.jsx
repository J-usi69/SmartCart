export const Registrar = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Registro de Usuario
        </h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-gray-600 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Apellido</label>
            <input
              type="text"
              placeholder="Apellido"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-600 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-600 mb-1">Rol</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="cliente">Cliente</option>
              <option value="delivery">Delivery</option>
            </select>
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
};
