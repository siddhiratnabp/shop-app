var reducer = (state, action) => {
  var newCart, item, index;
  switch (action.type) {
    case "ADD_ITEM_IN_CART":
      item = state.cart.find(obj => obj.id === action.payload.id)
      index = state.cart.findIndex(obj => obj.id === action.payload.id)
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
      item = state.cart.find(obj => obj.id === action.payload.id)
      index = state.cart.findIndex(obj => obj.id === action.payload.id)
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
      item = state.cart.find(obj => obj.id === action.payload.item.id)
      index = state.cart.findIndex(obj => obj.id === action.payload.item.id)
      
      if (Number(action.payload.cartCount) === 0) {
        newCart = state.cart.filter((obj) => obj.id !== action.payload.item.id)
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
    case "REMOVE_ITEM_IN_ORDER":
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.orderId !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
export default reducer;