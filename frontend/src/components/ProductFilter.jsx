import { useState, useEffect } from "react";

function ProductFilter({ products, setFilterProducts, showFilter, setSelectedCategory, selectedCategory }) {
  // initialized to null to indicate no category selected
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  // Implement your category logic here.
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategories([]); //clear/reset previously selected subcategory on changing category
  };

  // Implement your subcategory logic here.
  const handleSubcategoryChange = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
       setSelectedSubcategories(selectedSubcategories.filter(item => item !== subcategory)); 
      } 
      else { 
      setSelectedSubcategories([...selectedSubcategories, subcategory]); 
    }
  };

  // Apply filter logic here.
  useEffect(() => {
    let filtered = products; // ensure filtering starts with all available products

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedSubcategories.length > 0) {
        filtered = filtered.filter(
        (product) => selectedSubcategories.includes(product.subCategory)
      );
    }
    setFilterProducts(filtered); // update the filter products state with the filtered results
  }, [products, selectedCategory, selectedSubcategories, setFilterProducts]);

    return (
      <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="text-sm font-medium mb-3">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="All"
                onChange={() => { setSelectedCategory(null); 
                  setSelectedSubcategories([]); 
                  setFilterProducts(products);
                 }}
                checked={selectedCategory === null}
              />
              All Products
            </p>
            {["Spirit", "Wines", "Beers", "Mixers"].map((category) => (
              <p className="flex gap-2" key={category}>
                <input
                  type="checkbox"
                  className="w-3"
                  value={category}
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategory === category}
                />
                {category}
              </p>
            ))}
          </div>
        </div>
        <div className="border border-gray-300 pl-5 py-3 my-5">
          <p className="text-sm font-medium mb-3">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {selectedCategory ? (
              selectedCategory === "Spirit" &&
              ["Whisky", "Gin", "Vodka", "Rum", "Tequila", "Cognac"].map(
                (subCategory) => (
                  <p className="flex gap-2" key={subCategory}>
                    <input
                      type="checkbox"
                      className="w-3"
                      value={subCategory}
                      onChange={() => handleSubcategoryChange(subCategory)}
                      checked={selectedSubcategories.includes(subCategory)}
                    />
                    {subCategory}
                  </p>
                )
              )
            ) : (
              <p>Select a category </p>
            )}
            {selectedCategory === "Wines" &&
              ["Red Wine", "White Wine"].map((subCategory) => (
                <p className="flex gap-2" key={subCategory}>
                  <input
                    type="checkbox"
                    className="w-3"
                    value={subCategory}
                    onChange={() => handleSubcategoryChange(subCategory)}
                    checked={selectedSubcategories.includes(subCategory)}
                  />
                  {subCategory}
                </p>
              ))}
            {selectedCategory === "Beers" &&
              ["Beer", "Cider"].map((subCategory) => (
                <p className="flex gap-2" key={subCategory}>
                  <input
                    type="checkbox"
                    className="w-3"
                    value={subCategory}
                    onChange={() => handleSubcategoryChange(subCategory)}
                    checked={selectedSubcategories.includes(subCategory)}
                  />
                  {subCategory}
                </p>
              ))}
            {selectedCategory === "Mixers" &&
              ["Non-Alcoholic", "Infusions"].map((subCategory) => (
                <p className="flex gap-2" key={subCategory}>
                  <input
                    type="checkbox"
                    className="w-3"
                    value={subCategory}
                    onChange={() => handleSubcategoryChange(subCategory)}
                    checked={selectedSubcategories.includes(subCategory)}
                  />
                  {subCategory}
                </p>
              ))}
          </div>
        </div>
      </div>
    );
}

export default ProductFilter;
