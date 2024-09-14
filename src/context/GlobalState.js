import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [],
  orders: JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : [],
  deviceID: localStorage.getItem('deviceID') ? localStorage.getItem('deviceID') : '',
  fullAddress: localStorage.getItem('fullAddress') ? localStorage.getItem('fullAddress') : ''
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

  const removeItemFromOrderList = (item) => {
    dispatch({
      type: "REMOVE_ITEM_IN_ORDER",
      payload: item,
    });
  };
  
  const addFullAddress = (item) => {
    dispatch({
      type: "ADD_ADDRESS",
      payload: item,
    });
  };
  
  const addDeviceID = (item) => {
    dispatch({
      type: "ADD_DEVICE_ID",
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
        addItemToCartList,
        removeItemFromCartList,
        clearCart,
        addItemToOrderList,
        removeItemFromOrderList,
        setItemCountinCart,
        addFullAddress,
        addDeviceID
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
