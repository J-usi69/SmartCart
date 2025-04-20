import axios from "axios";
const BASE_URL = "https://backenddjango-production-c48c.up.railway.app";
const token = localStorage.getItem("token");

// Crear carrito
export async function crearCarrito() {
  const response = await fetch(`${BASE_URL}/api/cart/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({})
  });

  if (!response.ok) {
    throw new Error("Error al crear el carrito");
  }

  return await response.json();
}

// Obtener carritos
export async function obtenerCarritos() {
  const response = await fetch(`${BASE_URL}/api/cart/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener carritos");
  }

  return await response.json();
}

// Eliminar carrito
export async function eliminarCarrito(id) {
  const response = await fetch(`${BASE_URL}/api/cart/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar carrito");
  }
}

export async function actualizarCarrito(cartId, items) {
  const response = await axios.patch(`${BASE_URL}${cartId}/`, 
    { items }, 
    { headers: { Authorization: `Token ${token}` } }
  );
  return response.data;
}

