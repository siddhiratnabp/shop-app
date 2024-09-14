import React, { useState, useEffect } from "react";
import "./Shop.css";
import ItemList from "../itemList/ItemList";
import InfiniteScroll from "react-infinite-scroll-component";

function Shop({products}) {
    const [productsArray, setProductsArray] = useState([])
    const [currentProductsArray, setCurrentProductsArray] = useState([])
    useEffect(() => {
        setProductsArray(products)
        setCurrentProductsArray(products.slice(currentProductsArray.length, currentProductsArray.length + 8))    
    }, [])

    const fetchData = () => {
    if (currentProductsArray.length + 8 > productsArray.length) {
        setCurrentProductsArray([...currentProductsArray, ...productsArray.slice(currentProductsArray.length, productsArray.length)])
    } else {
        setCurrentProductsArray([...currentProductsArray, ...productsArray.slice(currentProductsArray.length, currentProductsArray.length + 8)])
    }
    }

    return (
        <InfiniteScroll
        dataLength={currentProductsArray.length} //This is important field to render the next data
        next={fetchData}
        hasMore={productsArray.length != currentProductsArray.length}
        loader={<h4 style={{padding: '10px'}}>Loading...</h4>}
        endMessage={
            <p style={{ textAlign: 'center' }}>
            <b>No more products!</b>
            </p>
        }
        >
            <ItemList items={currentProductsArray} />
        </InfiniteScroll>
    )
}

export default Shop;