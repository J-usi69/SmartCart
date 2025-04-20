import { getToken } from "./AuthService";

const BASE_URL = "https://backenddjango-production-c48c.up.railway.app";

export async function AgregarProductos(NewProduct) {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/api/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(NewProduct),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Error al agregar el producto");
  }

  return data;
}

export async function obtenerProductos() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/products/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return await response.json();
}

export async function editarProducto(ProductID, updateProduct) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/products/${ProductID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(updateProduct),
  });

  if (!response.ok) {
    throw new Error("Error Al Editar Producto");
  }
  
  return await response.json();
}

export async function EliminarProducto(ProductID){
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/products/${ProductID}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error Al Eliminar El Producto");
  }
  
  return true;
}
