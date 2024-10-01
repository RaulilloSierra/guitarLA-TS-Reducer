import { db } from "../data/db.ts";
import { CartItem, Guitar, GuitarId } from "../types";

export type CartActions =
  | { type: "addToCart"; payload: { item: Guitar } }
  | { type: "deleteFromCart"; payload: { id: GuitarId } }
  | { type: "increaseQuantity"; payload: { id: GuitarId } }
  | { type: "reduceQuantity"; payload: { id: GuitarId } }
  | { type: "clearCart" };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

export const initialState: CartState = {
  data: db,
  cart: [],
};

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
      };
    case "deleteFromCart":
      return {
        ...state,
      };
    case "increaseQuantity":
      return {
        ...state,
      };
    case "reduceQuantity":
      return {
        ...state,
      };
    case "clearCart":
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
