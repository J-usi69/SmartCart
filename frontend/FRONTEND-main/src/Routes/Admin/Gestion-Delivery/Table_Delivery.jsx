import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const sampleDelivery = [
  {
    id: 1,
    name: "Carlos Pérez",
    phone: "78945612",
    zone: "Centro",
    status: "Activo",
  },
  {
    id: 2,
    name: "Lucía Gómez",
    phone: "76439821",
    zone: "Zona Norte",
    status: "Inactivo",
  },
  {
    id: 3,
    name: "Marco Ríos",
    phone: "74512673",
    zone: "Zona Sur",
    status: "Activo",
  },
];

const statusColor = {
  Activo: "bg-green-100 text-green-800",
  Inactivo: "bg-red-100 text-red-800",
};

export const Table_Delivery = () => {
  const [search, setSearch] = useState("");
  const [deliveries, setDeliveries] = useState(sampleDelivery);

  const handleAssign = (id) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Activo" } : d))
    );
  };

  const filtered = deliveries.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="px-4 md:px-12 lg:px-24 py-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Gestión de Repartidores</h2>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="px-4 py-2 border rounded-md w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Zona</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Asignar Pedido</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{d.name}</td>
                <td className="px-4 py-3">{d.phone}</td>
                <td className="px-4 py-3">{d.zone}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColor[d.status]
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {d.status === "Inactivo" ? (
                    <button
                      onClick={() => handleAssign(d.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                    >
                      Asignar
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400">Asignado</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
