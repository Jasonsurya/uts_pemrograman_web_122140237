// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Ultraman1 from "../assets/UltramanPNG1.png";
import Ultraman2 from "../assets/UltramanPNG2.png";
import Ultraman3 from "../assets/UltramanPNG3.png";

import ShopPreview from "../previews/ShopPreview";
import GalleryPreview from "../previews/GalleryPreview";

const imageList = [Ultraman1, Ultraman2, Ultraman3];

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <b>Ultraverse Chronicle</b>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Jelajahi dunia Ultraman secara menyeluruh dari sejarah dan
          perkembangan setiap seri, hingga profil mendalam para Ultra Warriors
          dan Kaiju legendaris. Temukan fakta, kisah, serta momen ikonik yang
          membentuk semesta Ultraman dari masa ke masa. Semua yang ingin kamu
          ketahui tentang Ultraman, ada di sini.
        </p>
        <img
          src={imageList[currentImage]}
          alt="Ultraman Slide"
          className="w-[500px] h-auto mx-auto rounded-xl shadow-lg transition-all duration-700"
        />
      </section>

      {/* Navigation Buttons */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-16">
        {[
          { name: "Series", path: "/series" },
          { name: "Character", path: "/character" },
          { name: "News", path: "/news" },
          { name: "Informasi", path: "/information" },
          { name: "Shop", path: "/shop" },
          { name: "Gallery", path: "/gallery" },
          { name: "Community", path: "/community" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="bg-red-600 hover:bg-red-700 transition-colors rounded-2xl py-6 text-center font-semibold shadow-lg"
          >
            {item.name}
          </Link>
        ))}
      </section>

      {/* Preview Section */}
      <section className="px-4 sm:px-8 md:px-16 pb-16 space-y-12">
        <ShopPreview />
        <GalleryPreview />
      </section>
    </div>
  );
};

export default HomePage;
