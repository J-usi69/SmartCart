import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { obtenerUsuarios, EditarUsuarios } from "../../../Api/Users";

export const Table_Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [EditarUsuario, setEditarUsuario] = useState(null);

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditarUsuario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await EditarUsuarios(EditarUsuario.id, EditarUsuario);
      alert("Producto editado con éxito");
      const updatedUsers = await obtenerUsuarios();
      setEditarUsuario(updatedUsers); // cerrar modal
    } catch (error) {
      console.error("Error al editar producto", error.message);
    }
  };

  useEffect(() => {
    async function UserData() {
      try {
        const data = await obtenerUsuarios();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener productos", error.message);
      }
    }
    UserData();
  }, []);

  const filteredData = users.filter((user) =>
    user?.nombre?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2">
          <Plus size={18} /> Agregar Usuario
        </button>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="px-4 py-2 border rounded-md w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                Codigo
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Apellido
              </th>
              <th scope="col" className="px-6 py-3">
                Correo
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4">{user.nombre}</td>
                  <td className="px-6 py-4">{user.apellido}</td>
                  <td className="px-6 py-4">{user.correo}</td>
                  <td className="px-6 py-4">{user.password}</td>
                  <td className="px-6 py-4">
                    {user.is_staff ? (
                      <span className="text-green-600 font-medium">
                        Administrador
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">Cliente</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.is_active ? (
                      <span className="text-green-600 font-medium">Activo</span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        No Activo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      className="text-gray-500 hover:text-indigo-600"
                      onClick={() => setEditarUsuario(user)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {EditarUsuario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                name="nombre"
                value={EditarUsuario.nombre}
                onChange={handleEditChange}
                placeholder="Nombre"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="apellido"
                value={EditarUsuario.apellido}
                onChange={handleEditChange}
                placeholder="Apellido"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="correo"
                value={EditarUsuario.correo}
                onChange={handleEditChange}
                placeholder="Correo"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="password"
                name="password"
                value={EditarUsuario.password || ""}
                onChange={handleEditChange}
                placeholder="Contraseña"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                name="rol_id"
                value={EditarUsuario.rol_id}
                onChange={handleEditChange}
              />
              {/* <div className="flex gap-4">
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={EditarUsuario.is_active}
                    onChange={handleEditChange}
                  />
                  Activo
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="is_staff"
                    checked={EditarUsuario.is_staff}
                    onChange={handleEditChange}
                  />
                  Administrador
                </label>
              </div>*/}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setEditarUsuario(null)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
