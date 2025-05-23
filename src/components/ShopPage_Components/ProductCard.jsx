import React from "react";
import { useShop } from "../../contexts/ShopContext";

const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProduct } = useShop();

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-red-600">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h2 className="text-lg font-bold text-red-500">{product.name}</h2>
        <p className="text-sm">Rp {product.price.toLocaleString()}</p>
        <div className="mt-2 flex gap-2">
          <button onClick={() => setSelectedProduct(product)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
            Detail
          </button>
          <button onClick={() => addToCart(product)} className="bg-white text-black hover:bg-gray-200 px-3 py-1 rounded">
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
