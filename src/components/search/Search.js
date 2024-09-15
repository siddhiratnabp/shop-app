import React, { useState,useContext,useEffect } from "react";
import "./Search.css";
import { AutoComplete } from "primereact/autocomplete";
import { Link, useNavigate  } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { Button } from 'primereact/button';
import "primeflex/primeflex.css"

const assignGroupedProducts = (products, categories) => {
    const groupedProducts = []

    for (const category of categories) {
        groupedProducts.push({
            label: category['category'] + ' > ' + category['subCategory'],
            code:  category['subCategory'],
            items: []
        })
    }

    products.map((item) => {
        for (const [index,groupedProduct] of groupedProducts.entries()) {
            if (groupedProduct.label === item["Category"] + ' > ' + item["Sub Category"]) {
                groupedProducts[index].items.push(item)
            }
        }
    })
    return groupedProducts
  }

function Search () {
    const { addItemToCartList, cart, products, categories } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [groupedProducts, setGroupedProducts] = useState([]);
    useEffect(() => {
        const assignedGroupedProducts = assignGroupedProducts(products, categories)
        setGroupedProducts(assignedGroupedProducts)
    },[])

    const groupedScTemplate = (sc) => {
        return (
            <div className="flex align-items-center">
                {sc.label}
            </div>
        );
    };

    const itemTemplate = (item) => {
        let name = item["Product Name(English)"], mainImage = item['*Product Images1'],
        id = item.id, weight = item['Package Weight'], price = item['Actual Price'],
        sku = item.SKU
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                    <Link to={`/item/${item.id}`} key={item.id}>
                    <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`${item['*Product Images1']}`} alt={item["Product Name(English)"]} />
                    </Link>
                    <div className="flex-1 flex flex-column gap-2">
                        <Link to={`/item/${item.id}`} key={item.id}>
                        <span className="font-bold">{item['Product Name(English)']}</span>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag text-sm"></i>
                            <span>{item.label}</span>
                        </div>
                        </Link>
                    </div>
                    <Link to={`/item/${item.id}`} key={item.id}>
                        <span className="font-bold text-900">Rs. {item["Actual Price"]}</span>
                    </Link>
                    <Button label="Buy" severity="success" onClick={() => {
                        addItemToCartList({ mainImage, weight, id, name, price, sku });
                        navigate("/cart");
                    }} />
                </div>
        )
    }

    const search = (event) => {
        let query = event.query;
        setSearchQuery(event.query)
        let _filteredProducts = [];

        for (let product of groupedProducts) {
            let filteredItems = product.items.filter((item) => item["Product Name(English)"].toLowerCase().indexOf(query.toLowerCase()) !== -1);

            if (filteredItems && filteredItems.length) {
                _filteredProducts.push({ ...product, ...{ items: filteredItems } });
            }
        }

        setFilteredProducts(_filteredProducts);
    }

    return (
    <span className="search-box">
      <i class="fa-solid fa-magnifying-glass"></i>
      <AutoComplete value={searchQuery} suggestions={filteredProducts} completeMethod={search}
          field="label" optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupedScTemplate} placeholder="Find product"
          itemTemplate={itemTemplate} onBlur={() => setSearchQuery("")} onChange={(e) => setSearchQuery(e.target.value)}>
      </AutoComplete>
    </span>
    )
}

export default Search