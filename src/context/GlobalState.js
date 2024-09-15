import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [],
  deviceID: localStorage.getItem('deviceID') ? localStorage.getItem('deviceID') : '',
  fullAddress: localStorage.getItem('fullAddress') ? localStorage.getItem('fullAddress') : '',
  fullName: localStorage.getItem('fullName') ? localStorage.getItem('fullName') : '',
  phone: localStorage.getItem('phone') ? localStorage.getItem('phone') : '',
  orders: [],
  products: [],
  categories: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addItemToCartList = (item) => {
    dispatch({
      type: "ADD_ITEM_IN_CART",
      payload: item,
    });
  };

  const removeItemFromCartList = (item) => {
    dispatch({
      type: "REMOVE_ITEM_IN_CART",
      payload: item,
    });
  };

  const setItemCountinCart = (itemValue) => {
    dispatch({
      type: "SET_ITEM_COUNT_IN_CART",
      payload: itemValue,
    })
  }

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const addItemToOrderList = (item) => {
    dispatch({
      type: "ADD_ITEM_IN_ORDER",
      payload: item,
    });
  };

  const clearOrders = (item) => {
    dispatch({
      type: "CLEAR_ORDERS",
      payload: item,
    });
  };
  
  const addFullAddress = (item) => {
    dispatch({
      type: "ADD_ADDRESS",
      payload: item,
    });
  };

  const addFullName = (item) => {
    dispatch({
      type: "ADD_FULL_NAME",
      payload: item,
    });
  };

  const addPhone = (item) => {
    dispatch({
      type: "ADD_PHONE",
      payload: item,
    });
  };
  
  const addDeviceID = (item) => {
    dispatch({
      type: "ADD_DEVICE_ID",
      payload: item,
    });
  };
  
  const addProducts = (item) => {
    dispatch({
      type: "ADD_PRODUCTS",
      payload: item,
    });
  };

  const addCategories = (item) => {
    dispatch({
      type: "ADD_CATEGORIES",
      payload: item,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        cart: state.cart,
        orders: state.orders,
        deviceID: state.deviceID,
        fullAddress: state.fullAddress,
        fullName: state.fullName,
        phone: state.phone,
        products: state.products,
        categories: state.categories,
        addItemToCartList,
        removeItemFromCartList,
        clearCart,
        addItemToOrderList,
        clearOrders,
        setItemCountinCart,
        addFullAddress,
        addFullName,
        addPhone,
        addDeviceID,
        addProducts,
        addCategories
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
