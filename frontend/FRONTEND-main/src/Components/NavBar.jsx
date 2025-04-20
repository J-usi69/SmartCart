import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = ({ onLoginClick }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(auth === "true");
    };
  
    checkAuth(); // Al montar
  
    window.addEventListener("authChange", checkAuth);
  
    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token"); // Si tienes un token
    localStorage.removeItem("user"); // Si guardaste datos del usuario
    setIsAuthenticated(false);
     window.dispatchEvent(new Event("authChange")); // 
    navigate("/Home"); // Redirigir a Home u otra ruta
  };
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            <Link to="/Admin" className="text-white px-3 py-2">
              ADMIN
            </Link>
            <Link to="/Client" className="text-white px-3 py-2">
              CLIENTE
            </Link>
            <Link to="/Delivery" className="text-white px-3 py-2">
              DELIVERY
            </Link>
            <Link to="/Home" className="text-white px-3 py-2">
              HOME
            </Link>
            <Link to="/Products" className="text-white px-3 py-2">
              PRODUCTOS
            </Link>
          </div>

          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition text-sm"
              >
                Cerrar Sesión
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition text-sm"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
