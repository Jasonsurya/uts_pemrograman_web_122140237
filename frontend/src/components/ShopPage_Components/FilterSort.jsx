import React from "react";
import { useShop } from "../../contexts/ShopContext";

const FilterSort = () => {
  const { filter, setFilter, sort, setSort } = useShop();

  return (
    <div className="mb-4 flex flex-wrap justify-between items-center gap-4 p-4 bg-gray-800 rounded-lg">
      <input
        type="text"
        placeholder="Cari produk..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="px-3 py-2 rounded text-black"
      />
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 rounded text-black">
        <option value="">Urutkan</option>
        <option value="asc">Harga Terendah</option>
        <option value="desc">Harga Tertinggi</option>
      </select>
    </div>
  );
};

export default FilterSort;
