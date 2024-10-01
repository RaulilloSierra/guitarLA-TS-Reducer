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

const maxItems = 3;
const minItems = 1;

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  switch (action.type) {
    case "addToCart":
      const objExist = state.cart.find(
        (guitar) => guitar.id === action.payload.item.id
      );
      let updatedCart: CartItem[] = [];
      if (objExist) {
        updatedCart = state.cart.map((item) => {
          if (item.id === action.payload.item.id) {
            if (item.quantity < maxItems) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          } else {
            return item;
          }
        });
      } else {
        const newObj: CartItem = { ...action.payload.item, quantity: 1 };
        updatedCart = [...state.cart, newObj];
      }
      return {
        ...state,
        cart: updatedCart,
      };

    case "deleteFromCart":
      const removeCart = state.cart.filter(
        (guitar) => guitar.id !== action.payload.id
      );
      return {
        ...state,
        cart: removeCart,
      };

    case "increaseQuantity":
      const increaseQ = state.cart.map((item) => {
        if (item.id === action.payload.id && item.quantity < maxItems) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: increaseQ,
      };

    case "reduceQuantity":
      const reduceQ = state.cart.map((item) => {
        if (item.id === action.payload.id && item.quantity > minItems) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: reduceQ,
      };

    case "clearCart":
      return {
        ...state,
        cart: [],
      };

    default:
      return {
        ...state,
      };
  }
};
