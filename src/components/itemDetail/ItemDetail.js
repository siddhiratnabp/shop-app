import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemDetail.css";
import items from "../../mockData/items.json";
import { GlobalContext } from "../../context/GlobalState";

const getItemDetail = (id) => items.filter((item) => item.id === id)[0];

function ItemDetail() {
  const params = useParams();
  const itemId = parseInt(params?.id);
  const item = !!itemId && getItemDetail(itemId);
  const { addItemToCartList, cart, removeItemFromCartList, setItemCountinCart } = useContext(GlobalContext);
  const [isAdded, setIsAdded] = useState(
    cart.findIndex((c) => c.id === itemId) > -1
  );
  const itemCartCount = isAdded ? cart.find(obj => obj.id === item.id).count : 0;

  return (
    <div className="item-detail-container">
      <Link to="/"> &#8592; Back</Link>
      <div className="item-detail">
        <div className="item-detail-image">
          <img src={item.image.includes("https://") ? item.image : '/shop-app/' + item.image} alt={"Item image"} />
        </div>
        <div className="item-detail-info">
          <div className="item-brand" style={{ margin: "0px 10px" }}>
            {item.brand}
          </div>
          <div className="item-name">{item.name}</div>
          <div className="item-price">Rs. {item.price}</div>

          <select className="item-size">
            <option value={"S"}> Select size (S)</option>
            <option value={"M"}> Select size (M)</option>
            <option value={"L"}> Select size (L)</option>
            <option value={"XL"}> Select size (XL)</option>
          </select>
          <button
            className="item-btn"
            style={
              {background:"#4BB543"}
            }
            onClick={() => {
              addItemToCartList(item);
              setIsAdded(true);
            }}
          >
            {isAdded ? "Add more (+)" : (<><span>Add To Cart <i class='fas fa-shopping-cart'></i></span></>)}
          </button>
          {
            isAdded ? <span>
              <input type="text" value={itemCartCount} className="item-cart-count" 
              onChange = {(e) => {
                let value = e.target.value;
                if(isNaN(value)) {return}
                if(Number(e.target.value) === 0) {setIsAdded(false)}
                setItemCountinCart({
                  item: item,
                  cartCount: e.target.value
                })
              }}
              />
              <button className="item-btn" style={{ width: '40px', marginLeft: '5px', background: '#de450a'}}
              onClick = {() => {
                removeItemFromCartList(item);
                if(itemCartCount === 1) {setIsAdded(false) };
              }}>
                -
              </button> <br /><button
                className="item-btn"><Link to="/cart">Go to Cart <i class='fas fa-shopping-cart'></i></Link></button></span>
              : ""
          }


          <p className="item-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
