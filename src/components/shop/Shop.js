import React, { useState, useEffect, useRef, useContext } from "react";
import "./Shop.css";
import ItemList from "../itemList/ItemList";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "../search/Search";
import Select from 'react-select'
import { GlobalContext } from "../../context/GlobalState";

const getCategoriesOptions = (categories) => {
    let categoryOptions = [];
    let categoriesPushed = []

    categories.map((category) => {
        if (!categoriesPushed.includes(category['category'])) {
            categoryOptions.push({
                value: category['category'],
                label: category['category']
            })
            categoriesPushed.push(category['category'])
        }
    })
    return categoryOptions
}
const getSubCategoriesOptions = (categories) => {
    let subCategoryOptions = [];
    let subCategoriesPushed = []

    categories.map((category) => {
        if (!subCategoriesPushed.includes(category['subCategory'])) {
            subCategoryOptions.push({
                value: category['subCategory'],
                label: category['subCategory']
            })
            subCategoriesPushed.push(category['subCategory'])
        }
    })
    return subCategoryOptions
}

const filterProducts = (products, selectedCategory, selectedSubCategory) => {
    if (selectedSubCategory == null) {
        return products.filter((product) => product["Category"] === selectedCategory.value);
    } return products.filter((product) => product["Sub Category"] === selectedSubCategory.value);
}   

function Shop() {
    const { products, categories } = useContext(GlobalContext);
    const [productsArray, setProductsArray] = useState([])
    const [currentProductsArray, setCurrentProductsArray] = useState([])
    const [categoriesOptions, setcategoriesOptions] = useState([])
    const [subCategoriesOptions, setSubCategoriesOptions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedSubCategory, setSelectedSubCategory] = useState();
    const infScrollRef = useRef(null);

    useEffect(() => {
        setProductsArray(products)
        setCurrentProductsArray(products.slice(currentProductsArray.length, currentProductsArray.length + 8))
        let categoryOptions = getCategoriesOptions(categories)
        let subCategoryOptions = getSubCategoriesOptions(categories)
        setcategoriesOptions(categoryOptions)    
        setSubCategoriesOptions(subCategoryOptions) 
    }, [])

    useEffect(() => {
        if(selectedCategory != null || selectedSubCategory != null) {
            setProductsArray([]);
            setCurrentProductsArray([]);
            setTimeout(() => {
                const newProductsArray = filterProducts(products, selectedCategory, selectedSubCategory);
                setProductsArray(newProductsArray);
                setCurrentProductsArray(newProductsArray);
            }, 10)

            if (selectedCategory != null ) {
                let subCategoryOptions = getSubCategoriesOptions(categories.filter(category => category["category"] === selectedCategory.value))
                setSubCategoriesOptions(subCategoryOptions)
            }
        } else {
            setProductsArray([]);
            setCurrentProductsArray([]);
            setTimeout(() => {
                setProductsArray(products);
                setCurrentProductsArray(products.slice(currentProductsArray.length, currentProductsArray.length + 8));
            }, 10)
        }
    }, [selectedCategory, selectedSubCategory]);

    const fetchData = () => {
        if (currentProductsArray.length + 8 > productsArray.length) {
            setCurrentProductsArray([...currentProductsArray, ...productsArray.slice(currentProductsArray.length, productsArray.length)])
        } else {
            setCurrentProductsArray([...currentProductsArray, ...productsArray.slice(currentProductsArray.length, currentProductsArray.length + 8)])
        }
    }

    return (
        <>
            <Search products={products} categories={categories} /> <br />
            <div className="catSubCatSelect">
                <h3><i class="fa-solid fa-filter"></i> Filter:</h3>
                <Select options={categoriesOptions} isClearable={true} value={selectedCategory} onChange={
                    (category) => setSelectedCategory(category)} placeholder={"Select Category..."} />
                <Select options={subCategoriesOptions} isClearable={true} value={selectedSubCategory} onChange={
                        (subCategory) => setSelectedSubCategory(subCategory)} placeholder={"Select Sub Category..."}  /> <br />
            </div>
            <InfiniteScroll
                dataLength={currentProductsArray.length} //This is important field to render the next data
                next={fetchData}
                hasMore={productsArray.length != currentProductsArray.length}
                loader={<h4 style={{padding: '20px'}}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    <b>No more products!</b>
                    </p>
                }
            >
                <ItemList items={currentProductsArray} />
            </InfiniteScroll>
        </>
    )
}

export default Shop;