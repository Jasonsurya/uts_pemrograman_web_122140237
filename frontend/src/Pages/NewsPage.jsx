import React from "react";

const newsData = [
  {
    title: "Ultraman Blazar Tamat dengan Pertarungan Epik!",
    date: "1 April 2025",
    content: "Episode terakhir Ultraman Blazar menghadirkan pertarungan sengit melawan Kaiju berkekuatan kosmik. Fans memuji kualitas animasi dan cerita yang emosional.",
  },
  {
    title: "Seri Baru: Ultraman Gaia Reboot Diumumkan",
    date: "28 Maret 2025",
    content: "Suburaya Productions resmi mengumumkan reboot dari Ultraman Gaia yang akan tayang tahun 2026 dengan visual modern dan cerita baru.",
  },
  {
    title: "Event Spesial Ultraman Fest 2025 Akan Hadir di Tokyo",
    date: "20 Maret 2025",
    content: "Event tahunan terbesar bagi penggemar Ultraman akan digelar di Tokyo Dome, menghadirkan aktor, merchandise eksklusif, dan pertunjukan live!",
  },
];

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Ultraman News</h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{news.title}</h2>
            <p className="text-sm text-gray-400 mb-4">{news.date}</p>
            <p className="text-gray-200">{news.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
