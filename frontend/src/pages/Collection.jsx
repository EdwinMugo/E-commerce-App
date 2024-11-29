import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import Pagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import ProductSorting from "../components/ProductSorting";
import ProductSearch from "../components/ProductSearch";

function Collection() {
  const { products, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(12);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const currentProducts = filterProducts.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    if(filterProducts.length > 0) {
        setCurrentPage(1) ; // reset pagination if no products are found
    }
    
  }, [filterProducts]);

  useEffect (() => {
    setFilterProducts(products); // update filter products state with all available products
  }, [products])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Left display with Filters */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdown icon"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        <ProductFilter
          products={products}
          setFilterProducts={setFilterProducts}
          showFilter={showFilter}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>
      {/* Right display with Products */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
         <Title text1={"All"} text2={"PRODUCTS"} />

         {/* sorting */}
         <ProductSorting filterProducts={filterProducts} setFilterProducts={setFilterProducts}/>
        </div>

          {/* search */}
        <ProductSearch search={search} products={products} setFilterProducts={setFilterProducts} />
        
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            currentProducts.length > 0 ? (
              currentProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              ))
            ) : (
              <p className="col-span-full">
                No products to display for this {selectedCategory}
              </p>
            )
          ) : (
            <p className="col-span-full">
              No products to display for this selection
            </p>
          )}
        </div>
        {filterProducts.length > postPerPage && (
          <div className="mt-auto">
            <Pagination
              totalPosts={filterProducts.length}
              postsPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Collection;
