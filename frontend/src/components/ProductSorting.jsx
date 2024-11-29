import { useState, useEffect } from "react"



function ProductSorting({filterProducts, setFilterProducts}) {
    const [sortType, setSortType]= useState('ascending');

    const handleSortChange = (e)=> {
        setSortType(e.target.value);
    };

    //sorting logic
    useEffect (() => {
        let sortedProducts = [...filterProducts]; // create a shallow copy of the filterproducts array

        if (sortType === 'ascending'){
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        }else if(sortType=='descending'){
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        }else if(sortType=='low-high') {
            sortedProducts.sort((a, b) => a.price - b.price);
        }else if(sortType=='high-low') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        setFilterProducts(sortedProducts);
    }, [sortType, setFilterProducts]);

  return (
    <div>
        <select className="border-2 border-gray-300 text-sm px-2" onChange={handleSortChange} value={sortType}>
            <option value="ascending">Sort By: Title (A-Z)</option>
            <option value="descending">Sort By: Title (Z-A)</option>
            <option value="low-high">Sort By: Price (Low-High)</option>
            <option value="high-low">Sort By: Price (High-Low)</option>
          </select>
    </div>
  )
}

export default ProductSorting