import React from "react";
import Item from "../item/Item";
import "./ItemList.css";

function ItemList({ items }) {
  return (
    <div className="item-list">
      {items.map((item) => (
          <Item
            name={item["Product Name(English)"]}
            category={item.Category}
            subCategory={item["Sub Category"]}
            mainImage = {item["*Product Images1"]}
            image2 = {item["Product Images2"]}
            image3 = {item["Product Images3"]}
            image4 = {item["Product Images4"]}
            image5 = {item["Product Images5"]}
            image6 = {item["Product Images6"]}
            image7 = {item["Product Images7"]}
            image8 = {item["Product Images8"]}
            mainDescription = {item["Main Description"]}
            highlights ={item["Highlights"]}
            sku = {item.SKU}
            isActive = {item.isActive}
            price={item["Actual Price"]}
            stock={item.Stock}
            weight={item["Package Weight"]}
            length={item["Package Length"]}
            width={item["Package Width"]}
            height={item["Package Height"]}
            darazId={item["Daraz Product ID"]}
            id={item["id"]}
          />
      ))}
    </div>
  );
}

export default ItemList;
