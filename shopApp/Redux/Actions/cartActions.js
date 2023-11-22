import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constant";

const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export { addToCart, removeFromCart, clearCart };
