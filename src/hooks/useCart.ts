import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db.ts";
import type { Guitar, CartItem, GuitarId } from "../types/index.ts";

export default function useCart() {
  // Verificar si existe algo en localStorage
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  //Estados locales
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  // Items mínimos y máximos en el carrito de compras
  const maxItems = 3;
  const minItems = 1;

  // Almacenar en LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar al carrito
  const addToCart = (obj: Guitar) => {
    const objExist = cart.findIndex((guitar) => guitar.id === obj.id);
    if (objExist >= 0) {
      if (cart[objExist].quantity >= maxItems) return;
      const updatedCart = [...cart];
      updatedCart[objExist].quantity++;
      setCart(updatedCart);
    } else {
      const newObj: CartItem = { ...obj, quantity: 1 };
      setCart([...cart, newObj]);
    }
  };

  // Eliminar del carrito
  const deleteFromCart = (id: GuitarId) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  // Incrementar cantidades
  const increaseQuantity = (id: GuitarId) => {
    const increaseQ = cart.map((item) => {
      if (item.id === id && item.quantity < maxItems) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(increaseQ);
  };

  // Reducir cantidades
  const reduceQuantity = (id: GuitarId) => {
    const reduceQ = cart.map((item) => {
      if (item.id === id && item.quantity > minItems) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(reduceQ);
  };

  // Limpiar el carrito de compras
  const clearCart = () => {
    setCart([]);
  };

  // State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    deleteFromCart,
    increaseQuantity,
    reduceQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
}
