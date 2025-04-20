// src/Api/CarritoItem.js
import axios from "axios";
const BASE_URL = "https://backenddjango-production-c48c.up.railway.app";
const token = localStorage.getItem("token");

// Crear item en carrito
export async function agregarItemAlCarrito(productId, quantity, cartId) {
  const response = await fetch(`${BASE_URL}/api/cart-items/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: productId,
      quantity: quantity,
      cart: cartId,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al agregar item al carrito");
  }

  return await response.json();
}

// Obtener todos los items del carrito
export async function obtenerItemsCarrito() {
  const response = await fetch(`${BASE_URL}/api/cart-items/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los items del carrito");
  }

  return await response.json();
}

// Eliminar item del carrito
export async function eliminarItemCarrito(itemId) {
  const response = await fetch(`${BASE_URL}/api/cart-items/${itemId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar item del carrito");
  }
}

export async function actualizarItemCarrito(itemId, quantity, productId) {
  const response = await axios.patch(
    `${BASE_URL}/api/cart-items/${itemId}/`,
    {
      product: productId,
      quantity: quantity,
    },
    { headers: { Authorization: `Token ${token}` } }
  );
  return response.data;
}
