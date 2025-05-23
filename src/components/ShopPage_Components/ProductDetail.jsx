import React from "react";
import { useShop } from "../../contexts/ShopContext";

const ProductDetail = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useShop();

  if (!selectedProduct) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl border-2 border-red-500 w-[90%] md:w-1/2 text-white">
        <button onClick={() => setSelectedProduct(null)} className="text-red-500 font-bold text-lg float-right">X</button>
        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded"/>
        <h2 className="text-2xl mt-4 text-red-600 font-bold">{selectedProduct.name}</h2>
        <p className="mt-2">Harga: Rp {selectedProduct.price.toLocaleString()}</p>
        <button onClick={() => addToCart(selectedProduct)} className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700">Tambahkan ke Keranjang</button>
      </div>
    </div>
  );
};

export default ProductDetail;
