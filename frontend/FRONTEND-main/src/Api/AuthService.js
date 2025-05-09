const BASE_URL = import.meta.env.VITE_API_URL;

export async function loginUser(correo, password) {
  const response = await fetch(`${BASE_URL}/api-token-auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Error al iniciar sesión");
  }

  // Guardar token
  localStorage.setItem("token", data.token);

  return data;
}

export function getToken() {
  return localStorage.getItem("token");
}
