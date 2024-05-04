import React, { createContext, useContext, useState } from "react";


export const ComparisonContext = createContext();


export const ComparisonProvider = ({ children }) => {
  // State to store the selected products for comparison
  const [selectedProducts, setSelectedProducts] = useState([]);

  const addProduct = (product) => {

    if (selectedProducts.length === 2) {
      console.log("Already selected two products for comparison");
      return;
    }

    if (!selectedProducts.some((p) => p._id === product._id)) {

      setSelectedProducts((prevProducts) => [...prevProducts, product]);
    } else {
 
      console.log("Product already added for comparison");
    }
  };

  // Function to remove a product from the comparison list
  const removeProduct = (productId) => {
    // Filter out the product with the given productId
    const updatedProducts = selectedProducts.filter((p) => p._id !== productId);
    setSelectedProducts(updatedProducts);
  };

  // Function to clear all products from the comparison list
  const clearComparison = () => {
    setSelectedProducts([]);
  };

  // Value object to provide in the context
  const value = {
    selectedProducts,
    addProduct,
    removeProduct,
    clearComparison,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
