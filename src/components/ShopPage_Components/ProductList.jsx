import React from "react";
import ProductCard from "./ProductCard";
import { useShop } from "../../contexts/ShopContext";

const dummyProducts = [
  { id: 1, name: "Ultraman Tiga Figure", price: 150000, image: "/images/tiga.jpg" },
  { id: 2, name: "Ultraman Dyna Poster", price: 80000, image: "/images/dyna.jpg" },
  { id: 3, name: "Ultraman Orb Shirt", price: 120000, image: "/images/orb.jpg" }
];

const ProductList = () => {
  const { filter, sort } = useShop();

  let filtered = [...dummyProducts];
  if (filter) filtered = filtered.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  if (sort === "asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "desc") filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filtered.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
