import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ShopContext.Provider value={{
      cart,
      selectedProduct,
      setSelectedProduct,
      addToCart,
      removeFromCart,
      filter,
      setFilter,
      sort,
      setSort
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
