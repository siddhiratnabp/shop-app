import React, { useState } from "react";
import items from "../../mockData/items.json";
import ItemList from "../itemList/ItemList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from "../item/Item";
import { AutoComplete } from "primereact/autocomplete";

function HomePage() {
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

  const [selectedCity, setSelectedCity] = useState(null);
    const [filteredCities, setFilteredCities] = useState(null);
    const groupedCities = [
        {
            label: 'Germany',
            code: 'DE',
            items: [
                { label: 'Berlin', value: 'Berlin' },
                { label: 'Frankfurt', value: 'Frankfurt' },
                { label: 'Hamburg', value: 'Hamburg' },
                { label: 'Munich', value: 'Munich' }
            ]
        },
        {
            label: 'USA',
            code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
                { label: 'New York', value: 'New York' },
                { label: 'San Francisco', value: 'San Francisco' }
            ]
        },
        {
            label: 'Japan',
            code: 'JP',
            items: [
                { label: 'Kyoto', value: 'Kyoto' },
                { label: 'Osaka', value: 'Osaka' },
                { label: 'Tokyo', value: 'Tokyo' },
                { label: 'Yokohama', value: 'Yokohama' }
            ]
        }
    ];

    const groupedItemTemplate = (item) => {
        return (
            <div className="flex align-items-center">
                <img
                    alt={item.label}
                    src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                    className={`flag flag-${item.code.toLowerCase()} mr-2`}
                    style={{width: '18px'}}
                />
                <div>{item.label}</div>
            </div>
        );
    };
    const search = (event) => {
        let query = event.query;
        let _filteredCities = [];

        for (let country of groupedCities) {
            let filteredItems = country.items.filter((item) => item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1);

            if (filteredItems && filteredItems.length) {
                _filteredCities.push({ ...country, ...{ items: filteredItems } });
            }
        }

        setFilteredCities(_filteredCities);
    }


  return (
    <section>
      <div className="card flex justify-content-center">
        <AutoComplete value={selectedCity} onChange={(e) => setSelectedCity(e.value)} suggestions={filteredCities} completeMethod={search}
              field="label" optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupedItemTemplate} placeholder="Find your product" />
      </div>
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
      {/* <ItemList items={items} /> */}
    </section>
  );
}

export default HomePage;
