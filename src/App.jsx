import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import halaman
import HomePage from "./Pages/HomePage";
import SeriesPage from "./Pages/SeriesPage";
import CharacterPage from "./Pages/CharacterPage";
import NewsPage from "./Pages/NewsPage";
import InformationPage from "./Pages/InformationPage";

const App = () => {
  return (
    <Router>
      <div className="font-sans bg-black text-white min-h-screen">
        {/* Nanti kamu bisa tambahkan komponen Navbar di sini */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/character" element={<CharacterPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/information" element={<InformationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
