import axios from "axios";
import history from "../history";

//OPEN order = cart
//action types
const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const EDIT_ITEM_QTY = "EDIT_ITEM_QTY";
const CHECKOUT_CART = "CHECKOUT_CART";

//action creators
const setCart = (order) => ({
  type: SET_CART,
  order,
});

const _addToCart = (order) => ({
  type: ADD_TO_CART,
  order,
});

const _deleteFromCart = (order) => ({
  type: DELETE_FROM_CART,
  order,
});

const _editItemQty = (order) => ({
  type: EDIT_ITEM_QTY,
  order,
});

const _checkoutCart = (order) => ({
  type: CHECKOUT_CART,
  order,
});

//thunk creators
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      //may need to change get route from /orders to /users for myCart?
      const { data: cart } = await axios.get(`/api/users/${userId}/cart`);
      const action = setCart(cart);
      dispatch(action);
    } catch (error) {
      console.log("Cannot find cart", error);
    }
  };
};

export const addToCart = ({ punId, orderId, qty, price }) => {
  return async (dispatch) => {
    try {
      const lineItem = { punId, orderId, qty, price };
      const res = await axios.post("/api/orders/addToCart/", lineItem);
      const updatedLineItem = res.data;
      updatedLineItem["total"] = qty * price;
      dispatch(_addToCart(updatedLineItem));
    } catch (error) {
      console.log("Failed to add item to cart", error);
    }
  };
};

export const deleteFromCart = (punId) => {
  return async (dispatch) => {
    try {
      const { data: pun } = await axios.delete("/api/orders/deleteItem", punId);
      dispatch(_deleteFromCart(pun));
    } catch (error) {
      console.log("Unable to remove item from cart", error);
    }
  };
};

export const editItemQty = ({ punId, orderId, qty, price }) => {
  return async (dispatch) => {
    try {
      const lineItem = { punId, orderId, qty, price };
      const res = await axios.put("/api/orders/orderId/", lineItem);
      const updatedLineItem = res.data;
      updatedLineItem["total"] = qty * price;
      dispatch(_editItemQty(updatedLineItem));
    } catch (error) {
      console.log("Failed to edit cart", error);
    }
  };
};

export const checkoutCart = (order) => {
  return async (dispatch) => {
    order.status = "fulfilled";
    try {
      const { data } = await axios.put(`/checkout/orderId/${order.id}`, order);
      dispatch(_checkoutCart(data));
    } catch (error) {
      console.log("Unable to process checkout", error);
    }
  };
};

//initial state
const initialState = { userId: null, total: 0, items: [] };

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.order;
    case ADD_TO_CART:
      return {};
    case DELETE_FROM_CART:
      return action.order;
    case EDIT_ITEM_QTY:
      return action.order;
    default:
      return state;
  }
}