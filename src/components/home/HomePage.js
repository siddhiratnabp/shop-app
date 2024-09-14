import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    products.sort((product1, product2) => {
      return product1["Carousel Index"] - product2["Carousel Index"]
    })
  }, [products])

  

  return (
    <section>
      <Search products={products} categories={categories}/>
      <Slider {...settings}>
        {
        products.map((item) => {
          if (item["Carousel Index"] > 0) {
            return <Item
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
          }
        })}
      </Slider>
    </section>
  );
}

export default HomePage;
