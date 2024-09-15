var reducer = (state, action) => {
  var newCart, item, index;
  switch (action.type) {
    case "ADD_ITEM_IN_CART":
      item = state.cart.find(obj => Number(obj.id) === Number(action.payload.id))
      index = state.cart.findIndex(obj => Number(obj.id) === Number(action.payload.id))
      if(item !== undefined && "count" in item) {
        item.count += 1
        state.cart.splice(index, 1, item);
        newCart = state.cart;
      } else {
        action.payload.count = 1
        newCart = [action.payload, ...state.cart]
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };
    case "REMOVE_ITEM_IN_CART":
      item = state.cart.find(obj => Number(obj.id) === Number(action.payload.id))
      index = state.cart.findIndex(obj => Number(obj.id) === Number(action.payload.id))
      if (item.count > 1) {
        item.count -= 1
        state.cart.splice(index, 1, item);
        newCart = state.cart;
      } else {
        newCart = state.cart.filter((obj) => obj.id !== action.payload.id)
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };
    case "SET_ITEM_COUNT_IN_CART":
      item = state.cart.find(obj => Number(obj.id) === Number(action.payload.item.id))
      index = state.cart.findIndex(obj => Number(obj.id) === Number(action.payload.item.id))
      
      if (Number(action.payload.cartCount) === 0) {
        newCart = state.cart.filter((obj) => Number(obj.id) !== Number(action.payload.item.id))
      } else {
        item.count = action.payload.cartCount
        state.cart.splice(index, 1, item);
        newCart = state.cart;
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };

    case "CLEAR_CART":
      localStorage.removeItem('cart');
      return {
        ...state,
        cart: [],
      };
    case "ADD_ITEM_IN_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case "CLEAR_ORDERS":
      return {
        ...state,
        orders: [],
      };
    case "ADD_ADDRESS":
      localStorage.setItem('fullAddress', action.payload);
      return {
        ...state,
        fullAddress: action.payload,
      };
      case "ADD_FULL_NAME":
        localStorage.setItem('fullName', action.payload);
        return {
          ...state,
          fullName: action.payload,
        };
        case "ADD_PHONE":
          localStorage.setItem('phone', action.payload);
          return {
            ...state,
            phone: action.payload,
          };
    case "ADD_DEVICE_ID":
      localStorage.setItem('deviceID', action.payload);
      return {
        ...state,
        deviceID: action.payload,
      };
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;