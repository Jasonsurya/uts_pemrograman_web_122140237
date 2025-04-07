import React from "react";
import { FaInstagram, FaYoutube, FaGlobe } from "react-icons/fa";

const InformationPage = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Information & Links</h1>

      <div className="max-w-3xl mx-auto space-y-6">

        <div className="bg-gray-900 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Official Links</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaInstagram className="text-pink-500 text-xl" />
              <a
                href="https://www.instagram.com/tsuburaya_prod"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-300"
              >
                Instagram - @tsuburaya_prod
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaYoutube className="text-red-600 text-xl" />
              <a
                href="https://www.youtube.com/@tsuburaya"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-300"
              >
                YouTube - Tsuburaya Official
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaGlobe className="text-green-400 text-xl" />
              <a
                href="https://en.tsuburaya-prod.co.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-300"
              >
                Website - tsuburaya-prod.co.jp
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">About This Website</h2>
          <p className="text-gray-300">
            Website ini dibuat sebagai proyek fanbase untuk menunjukkan apresiasi terhadap waralaba Ultraman. Semua gambar dan informasi diambil dari sumber resmi dan digunakan hanya untuk tujuan edukasi dan hiburan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
