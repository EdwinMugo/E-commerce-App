import { useEffect } from "react";

function ProductSearch({ search, products, setFilterProducts }) {
  // implement your search logic here, filtering products based on search query and updating filterProducts state variable.
  useEffect(() => {
    if (search) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterProducts(filteredProducts);
    }
    else{
        setFilterProducts(products);
    }
  }, [search, products, setFilterProducts]);
  return null;
}

export default ProductSearch;
