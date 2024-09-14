import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemDetail.css";
import items from "../../mockData/items.json";
import { GlobalContext } from "../../context/GlobalState";
import { get, getDatabase, ref, limitToFirst, query, limitToLast } from "firebase/database";
import { app } from "../../firebaseConfig";




function ItemDetail() {
  const params = useParams();
  const itemId = parseInt(params?.id);
  const [item, setItem] = useState({});
  const { addItemToCartList, cart, removeItemFromCartList, setItemCountinCart } = useContext(GlobalContext);
  const [isAdded, setIsAdded] = useState(
    cart.findIndex((c) => c.id === itemId) > -1
  );
  const itemCartCount = isAdded ? cart.find(obj => obj.id === item.id).count : 0;

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, `products/${itemId}`);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val() !== undefined) {
          setItem(snapshot.val())
        }
      }
    });
  }, [])


  return (
    <div className="item-detail-container">
      <Link to="/"> &#8592; Back</Link>
      <div className="item-detail">
        <div className="item-detail-image">
          <img src={item["*Product Images1"]} alt={"Item image"} />
        </div>
        <div className="item-detail-info">
          <div className="item-brand" style={{ margin: "0px 10px" }}>
            {item["Category"] + ' > ' + item["Sub Category"]} 
          </div>
          <div className="item-name">{item["Product Name(English)"]}</div>
          <div className="item-price">Rs. {item["Actual Price"]}</div>

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
            {item["Highlights"]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
