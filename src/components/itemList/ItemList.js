import React from "react";
import Item from "../item/Item";
import "./ItemList.css";

function ItemList({ items }) {
  return (
    <div className="item-list">
      {items.map((item) => (
          <Item
            name={item.name}
            rating={item.rating}
            price={item.price}
            saleDiscount={item.saleDiscount}
            image={item.image.includes("https://") ? item.image : '/shop-app/'+item.image}
            brand={item.brand}
            id={item.id}
            weight={item.weight}
          />
      ))}
    </div>
  );
}

export default ItemList;
