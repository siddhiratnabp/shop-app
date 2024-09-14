import React, { useState } from "react";
import items from "../../mockData/items.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from "../item/Item";
import "./HomePage.css";
import Search from "../search/Search";
        

function HomePage({products, categories}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 1350,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplaySpeed: 1500,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          autoplaySpeed: 2500,
        },
      },
    ]
  };

  

  return (
    <section>
      <Search products={products} categories={categories}/>
      <Slider {...settings}>
        {
        items.slice(0, 10).map((item) => {
          return <Item
            name={item.name}
            rating={item.rating}
            price={item.price}
            saleDiscount={item.saleDiscount}
            image={item.image.includes("https://") ? item.image : '/shop-app/'+item.image}
            brand={item.brand}
            id={item.id}
            weight={item.weight}
          />
        })}
      </Slider>
    </section>
  );
}

export default HomePage;
