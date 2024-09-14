import React, { useContext, useState } from "react";
import "./Item.css";
import { Link, useNavigate  } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

function Item({ name, category, subCategory, mainImage, image2, image3, image4, image5,
  image6, image7, image8, mainDescription, highlights, sku, isActive, price, stock, weight,
  length, width, height, id
 }) {
  const { addItemToCartList, cart, removeItemFromCartList } = useContext(GlobalContext);
  const [isAdded, setIsAdded] = useState(
    cart.findIndex((c) => c.id === id) > -1
  );
  const navigate = useNavigate();

  if (isActive === "inactive") {return}
  else return (
    <div className="item-card">
      <Link to={`/item/${id}`} key={id}>
        <img src={mainImage} alt={"Item image"} width="100%" onLoad={() => (<h1>Loading</h1>)} />
      </Link>
      {/* <div className="item-brand">{brand}</div> */}
      <div className="item-name">
        <Link to={`/item/${id}`} key={id}><p className="name">{name}</p></Link>
        {
          isAdded ? <Link to={'/cart'}><span className="success-btn">Go to cart <i class="fas fa-shopping-cart"></i></span></Link> 
          :(<>
          <i  onClick={() => {
            // addItemToCartList({ name, rating, price, saleDiscount, image, brand, id, weight });
            setIsAdded(true);
          }}
      class="fa-solid fa-cart-plus"></i>
          <span onClick={() => {
            // addItemToCartList({ name, rating, price, saleDiscount, image, brand, id, weight });
            setIsAdded(true);
            navigate("/cart");
          }} >Buy</span>
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
