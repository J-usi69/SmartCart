import { ProductCard } from "../../../Components/ProductCard";
import { obtenerProductos } from "../../../Api/Product";
import { useState } from "react";
import { useEffect } from "react";

export const Products = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al Cargar Productos", error.message);
      }
    };
    cargarProductos();
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
};
