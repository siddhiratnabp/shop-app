import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemDetail.css";
// import items from "../../mockData/items.json";
import { GlobalContext } from "../../context/GlobalState";
import { get, getDatabase, ref } from "firebase/database";
import { app } from "../../firebaseConfig";
import parse from 'html-react-parser';
import { TabView, TabPanel } from 'primereact/tabview';
import { Galleria } from 'primereact/galleria';
import "primeflex/primeflex.css"
import 'primereact/resources/themes/nano/theme.css'



function ItemDetail() {
  const params = useParams();
  const itemId = parseInt(params?.id);
  const [item, setItem] = useState({});
  const { addItemToCartList, cart, removeItemFromCartList, setItemCountinCart } = useContext(GlobalContext);
  const [isAdded, setIsAdded] = useState(
    cart.findIndex((c) => Number(c.id) === itemId) > -1
  );
  const itemCartCount = isAdded ? cart.find(obj => Number(obj.id) === Number(itemId)).count : 0;
  

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

    const responsiveOptions = [
        {
            breakpoint: '1125px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '680px',
            numVisible: 2
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];


    const itemTemplate = (item) => {
        return <img src={item} alt={item} style={{ width: '100%' }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={item} alt={item} style={{width: '100px'}} />
    }


  return (
    <div className="item-detail-container">
      <Link to="/shop"> &#8592; Back</Link>
      <div className="item-detail">
        <Galleria value={[
          item["*Product Images1"],
          item["Product Images2"],
          item["Product Images3"],
          item["Product Images4"],
          item["Product Images5"],
          item["Product Images6"],
          item["Product Images7"],
          item["Product Images8"]
        ]} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }} 
    item={itemTemplate} thumbnail={thumbnailTemplate} activeIndex={0} />
    <br />
        <div className="item-detail-info">
          <div className="item-brand" style={{ margin: "0px 10px" }}>
            {item["Category"] + ' > ' + item["Sub Category"]} 
          </div>
          <div className="item-name">{item["Product Name(English)"]}</div>
          <div className="item-price">Rs. {item["Actual Price"]}</div>
          <button
            className="item-btn"
            style={
              {background:"#4BB543"}
            }
            onClick={() => {
              addItemToCartList({ 
                mainImage: item["*Product Images1"],
                weight: item["Package Weight"],
                id: itemId,
                name: item["Product Name(English)"],
                price: item["Actual Price"],
                sku: item.SKU
              });
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
                  item: { 
                    mainImage: item["*Product Images1"],
                    weight: item["Package Weight"],
                    id: itemId,
                    name: item["Product Name(English)"],
                    price: item["Actual Price"],
                    sku: item.SKU
                  },
                  cartCount: Number(e.target.value)
                })
              }}
              />
              <button className="item-btn" style={{ width: '40px', marginLeft: '5px', background: '#de450a'}}
              onClick = {() => {
                removeItemFromCartList({
                  mainImage: item["*Product Images1"],
                  weight: item["Package Weight"],
                  id: itemId,
                  name: item["Product Name(English)"],
                  price: item["Actual Price"],
                  sku: item.SKU
                });
                if(itemCartCount === 1) {setIsAdded(false) };
              }}>
                -
              </button> <button
                className="item-btn"><Link to="/cart">Go to Cart <i class='fas fa-shopping-cart'></i></Link></button></span>
              : ""
          }
          <br /><br />
        <div className="card">
          <TabView>
            <TabPanel header="Highlights">
              {parse(item["Highlights"] ? item["Highlights"] : "")}
            </TabPanel>
            <TabPanel header="Main Description">
              {parse(item["Main Description"] ? item["Main Description"] : "")}
            </TabPanel>
            <TabPanel header="Shipping Attributes">
              <b>These are only the shipping attributes. Please find the product height width in Highlights tab.</b>
              <ul>
                <li>Package Weight (approx.): {item["Package Weight"]}</li>
                <li>Package Length: {item["Package Length"]}</li>
                <li>Package Width: {item["Package Weight"]}</li>
                <li>Package Height: {item["Package Height"]}</li>
              </ul>
            </TabPanel>
          </TabView>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
