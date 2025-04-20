import { useCart }  from "../Context/CarritoContext.jsx"

export const ProductCard = ({ producto }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const yaEnCarrito = cart.some((item) => item.id === producto.id);

  const handleClick=()=>{
    if (yaEnCarrito){
      removeFromCart(producto.id);
    }else{
      addToCart(producto);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={producto.image_url || "/default-image.png"}
        alt={producto.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1">
        <h2 className="text-lg font-semibold">{producto.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{producto.description}</p>
        <p className="text-indigo-600 font-bold text-lg">${producto.price}</p>
      </div>
      <div className="flex gap-2 p-4 border-t">
        <button
        className="w-full border border-gray-400 rounded py-2 text-gray-700 hover:bg-gray-100 transition">
          Cancelar
        </button>
        <button
          className={`w-full bg-indigo-600 text-white py-2 rounded ${
            yaEnCarrito ?
            "bg-red-600 text-white hover:bg-red-700"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          onClick={handleClick}
        >
          {yaEnCarrito ? "Quitar del Carrito" : "Agregar al Carrito"}
        </button>
      </div>
    </div>
  );
};
