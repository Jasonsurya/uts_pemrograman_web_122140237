import React from "react";
import { useShop } from "../../contexts/ShopContext";

const Cart = () => {
  const { cart, removeFromCart } = useShop();

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg border border-red-600">
      <h3 className="text-xl font-bold text-red-500">Keranjang</h3>
      {cart.length === 0 ? (
        <p className="text-sm text-gray-400">Belum ada produk.</p>
      ) : (
        cart.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center mt-2 border-b border-gray-700 pb-2">
            <span className="text-sm">{item.name}</span>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">Hapus</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
