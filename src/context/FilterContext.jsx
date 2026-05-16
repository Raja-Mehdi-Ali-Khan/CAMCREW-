import { createContext, useCallback, useContext, useState } from "react";

export const FilterContext = createContext();
const PRICE_MIN = 300;
const PRICE_MAX = 5000;

const FilterProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    rating: null,
    price: null,
    pincode: null,
    state: null,
  });
  const [sort, setSort] = useState({
    priceAsc: false,
    priceDesc: false,
    popularAsc: false,
    popularDesc: false,
  });

  const ascSort = () => {
    setProducts([...products].sort((a, b) => a.price - b.price));
  };
  const descSort = () => {
    setProducts([...products].sort((a, b) => b.price - a.price));
  };
  const popularAscSort = () => {
    setProducts(
      [...products].sort((a, b) => a.averageRating - b.averageRating)
    );
  };
  const popularDescSort = () => {
    setProducts(
      [...products].sort((a, b) => b.averageRating - a.averageRating)
    );
  };

  const applyFilters = useCallback((categoryProducts, filters) => {
    // Apply existing filters to the products
    let filteredProducts = [...categoryProducts];

    // Apply rating filter
    if (filters.rating !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.averageRating >= filters.rating
      );
    }
    if (filters.state !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.state == filters.state
      );
    }

    // Apply price filter
    if (filters.price !== null) {
      const normalizedPrice =
        typeof filters.price === "object"
          ? filters.price
          : { min: PRICE_MIN, max: parseInt(filters.price) };
      const minPrice = Number(normalizedPrice.min ?? PRICE_MIN);
      const maxPrice = Number(normalizedPrice.max ?? PRICE_MAX);

      filteredProducts = filteredProducts.filter(
        (product) => {
          const productPrice = Number(product.price) || 0;
          const isAboveMin = productPrice >= minPrice;
          const isWithinMax =
            maxPrice >= PRICE_MAX ? true : productPrice <= maxPrice;

          return isAboveMin && isWithinMax;
        }
      );
    }
    if (filters.pincode !== null) {
      filteredProducts = filteredProducts.filter((product) =>
        product.pincode.includes(filters.pincode)
      );
    }

    return filteredProducts;
  }, []);

  return (
    <FilterContext.Provider
      value={{
        products,
        setProducts,
        ascSort,
        descSort,
        filters,
        setFilters,
        applyFilters,
        sort,
        setSort,
        popularAscSort,
        popularDescSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

const useFilter = () => useContext(FilterContext);

export { useFilter };
