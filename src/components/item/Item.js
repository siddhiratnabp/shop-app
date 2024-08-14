import React, { useContext, useState } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

function Item({ name, rating, price, saleDiscount, image, brand, id }) {
  const { addItemToCartList, cart, removeItemFromCartList } = useContext(GlobalContext);
  const [isAdded, setIsAdded] = useState(
    cart.findIndex((c) => c.id === id) > -1
  );

  return (
    <div className="item-card">
      <Link to={`/item/${id}`} key={id}>
        <img src={image} alt={"Item image"} width="100%" />
      </Link>
      {/* <div className="item-brand">{brand}</div> */}
      <div className="item-name">
        <Link to={`/item/${id}`} key={id}><p className="name">{name}</p></Link>
        {
          isAdded ? <Link to={'/cart'}><span className="success-btn">Go to cart</span></Link> 
          :(<>
          <i  onClick={() => {
            addItemToCartList({ name, rating, price, saleDiscount, image, brand, id });
            setIsAdded(true);
          }}
      class="fa-solid fa-cart-plus"></i>
          <span>Buy</span>
          </>
          )
        }   
      </div>
      <Link to={`/item/${id}`} key={id}>
        <div className="item-info">
          <div className="item-price">Rs. {price}</div>
          {/* <div className="item-rating">{rating}&#9733;</div> */}
        </div>
      </Link>
    </div>
  );
}

export default Item;
