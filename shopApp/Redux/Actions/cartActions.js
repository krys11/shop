import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constant";

const addToCard = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

const removeFromCard = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

const clearCard = (payload) => {
  return {
    type: CLEAR_CART,
  };
};

export { addToCard, removeFromCard, clearCard };
