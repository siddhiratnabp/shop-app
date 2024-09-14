import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Cart.css";
import { Steps } from 'primereact/steps';

function Cart({buyingStep, buyingSteps, setBuyingStep}) {
  const { addItemToCartList, cart, removeItemFromCartList } = useContext(GlobalContext);
  let total = 0
  let totalWeight = 0
  setBuyingStep(0);

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
      <Steps model={buyingSteps} activeIndex={buyingStep} />
      <div><h1>Cart</h1></div>
      {!cart.length ? (
        <p>No Item Added! Please add something to your cart</p>
      ) : (
        <>
          <div className="cart-list">
            {
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                <img src={item.image} style={{maxWidth: "25%"}} />
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
                <div style={{float: 'right'}}>{(item.weight * item.count).toFixed(2)} kgs</div>
                <Link to={`/item/${item.id}`} key={item.id}>
                  <div className="item-name">{item.name}</div>
                  <div className="item-expectedDelivery">
                    (Expected Delivery 3 - 6 days)
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="cart-price"><br />{cart.forEach((item) => {
            total += Math.round(item.price * item.count)
            totalWeight += item.weight * item.count
          })}Rs. {total} & {totalWeight.toFixed(2)} kgs <br />
          <Link to="/checkout">
            <button className="item-btn">Next</button>
          </Link>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default Cart;
