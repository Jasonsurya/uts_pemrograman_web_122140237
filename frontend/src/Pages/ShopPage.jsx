import React from "react";
import ProductList from "../Components/ShopPage_Components/ProductList";
import FilterSort from "../Components/ShopPage_Components/FilterSort";
import Cart from "../Components/ShopPage_Components/Cart";
import ProductDetail from "../Components/ShopPage_Components/ProductDetail";
import CheckoutForm from "../Components/ShopPage_Components/CheckoutForm";
import { useShop } from "../contexts/ShopContext";

const ShopPage = () => {
  const { selectedProduct } = useShop();

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-red-600 text-center py-6">
        Ultraverse Chronicle Shop
      </h1>
      <div className="flex flex-col lg:flex-row px-4 gap-4">
        <div className="lg:w-3/4">
          <FilterSort />
          <ProductList />
        </div>
        <div className="lg:w-1/4">
          <Cart />
        </div>
      </div>
      {selectedProduct && <ProductDetail />}
      <CheckoutForm />
    </div>
  );
};

export default ShopPage;