// src/Context/CarritoContext.jsx
import { createContext, useContext, useState } from "react";
import {
  crearCarrito,
  eliminarCarrito,
} from "../Api/Carrito";
import {
  agregarItemAlCarrito,
  eliminarItemCarrito,
  actualizarItemCarrito,
} from "../Api/CarritoItem";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null); // carrito del usuario actual

  const inicializarCarrito = async () => {
    try {
      const data = await crearCarrito();
      setCartId(data.id);
    } catch (error) {
      console.error("Error creando carrito:", error);
    }
  };

  const addToCart = async (producto) => {
    try {
      const existe = cart.find((p) => p.id === producto.id);
      if (!existe) {
        const res = await agregarItemAlCarrito(producto.id, 1, cartId);
        setCart((prev) => [
          ...prev,
          { ...producto, quantity: 1, itemId: res.id }, // 👈 importante
        ]);
      }
    } catch (error) {
      console.error("Error agregando al carrito:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const item = cart.find((i) => i.id === productId);
      if (item) {
        await eliminarItemCarrito(item.itemId); // necesitas tener `itemId` (el ID del ítem en la API)
        setCart((prev) => prev.filter((p) => p.id !== productId));
      }
    } catch (error) {
      console.error("Error eliminando del carrito:", error);
    }
  };

  const clearCart = async () => {
    try {
      await eliminarCarrito(cartId);
      setCart([]);
      setCartId(null);
    } catch (error) {
      console.error("Error vaciando carrito:", error);
    }
  };

  const aumentarCantidad = async (itemId, currentQuantity, productId) => {
    try {
      const nuevaCantidad = currentQuantity + 1;
      await actualizarItemCarrito(itemId, nuevaCantidad, productId);
      setCart((prev) =>
        prev.map((item) =>
          item.itemId === itemId ? { ...item, quantity: nuevaCantidad } : item
        )
      );
    } catch (error) {
      console.error("Error al aumentar cantidad:", error);
    }
  };

  const disminuirCantidad = async (itemId, currentQuantity, productId) => {
    try {
      if (currentQuantity > 1) {
        const nuevaCantidad = currentQuantity - 1;
        await actualizarItemCarrito(itemId, nuevaCantidad, productId);
        setCart((prev) =>
          prev.map((item) =>
            item.itemId === itemId ? { ...item, quantity: nuevaCantidad } : item
          )
        );
      }
    } catch (error) {
      console.error("Error al disminuir cantidad:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        inicializarCarrito,
        addToCart,
        removeFromCart,
        clearCart,
        aumentarCantidad,
        disminuirCantidad
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
