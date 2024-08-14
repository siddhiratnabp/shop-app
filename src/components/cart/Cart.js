import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Cart.css";

function Cart() {
  const { addItemToCartList, cart, removeItemFromCartList } = useContext(GlobalContext);
  let total = 0

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {!cart.length ? (
        <p>No Item Added! Please add something to your cart</p>
      ) : (
        <>
          <div className="cart-list">
            {
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                <div className="item-price">Rs. {item.price} <span className="item-count">
                  <button onClick={()=>{addItemToCartList(item)}}
                  style={{background: "#343434", padding: "2px", color: "white"}}>
                    +
                  </button> x {item.count} item(s) 
                  <button onClick={()=>{removeItemFromCartList(item)}}
                  style={{background: "#343434", padding: "2px", color: "white"}}>
                    -
                  </button> 
                </span>
                 = <strong>Rs. {Math.round(item.price * item.count)}</strong>
                </div>
                <Link to={`/item/${item.id}`} key={item.id}>
                  <div className="item-name">{item.name}</div>
                  <div className="item-expectedDelivery">
                    (Expected Delivery 3 - 6 days)
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <br />{cart.forEach((item) => {
            total += Math.round(item.price * item.count)
          })}Rs. {total}<br />
          <Link to="/checkout">
            <button className="item-btn">Next</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
