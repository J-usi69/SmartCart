const BASE_URL = "https://backenddjango-production-c48c.up.railway.app";

export async function loginUser(username, password) {
  const response = await fetch(`${BASE_URL}/api-token-auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
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
