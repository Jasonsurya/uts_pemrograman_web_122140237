import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Ultraverse Chronicle</h1>
      <ul className="flex space-x-4">
        <li><Link to="/series" className="hover:text-red-500">Series</Link></li>
        <li><Link to="/character" className="hover:text-red-500">Character</Link></li>
        <li><Link to="/news" className="hover:text-red-500">News</Link></li>
        <li><Link to="/information" className="hover:text-red-500">Informasi</Link></li>
        <li><Link to="/shop" className="hover:text-red-500">Shop</Link></li>
        <li><Link to="/gallery" className="hover:text-red-500">Gallery</Link></li>
        <li><Link to="/community" className="hover:text-red-500">Community</Link></li>
      </ul>
      <Link to="/login" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Login</Link>
    </nav>
  );
};

export default Navbar;
