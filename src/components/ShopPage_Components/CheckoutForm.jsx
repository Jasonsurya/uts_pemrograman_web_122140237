import React from "react";
import { useShop } from "../../contexts/ShopContext";

const CheckoutForm = () => {
  const { cart } = useShop();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-900 text-white mt-8 p-6 rounded-lg max-w-xl mx-auto border border-red-600">
      <h2 className="text-2xl text-red-600 font-bold mb-4">Checkout</h2>
      <p className="mb-2">Total: Rp {total.toLocaleString()}</p>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Nama Lengkap" className="p-2 text-black rounded"/>
        <input type="text" placeholder="Alamat Pengiriman" className="p-2 text-black rounded"/>
        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Bayar Sekarang</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
