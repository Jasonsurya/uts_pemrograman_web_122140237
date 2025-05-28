import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/HomePage_Components/Navbar";
import Footer from "./components/HomePage_Components/Footer";

import HomePage from "./Pages/HomePage";
import SeriesPage from "./Pages/SeriesPage";
import CharacterPage from "./Pages/CharacterPage";
import NewsPage from "./Pages/NewsPage";
import InformationPage from "./Pages/InformationPage";
import GalleryPage from "./Pages/GalleryPage";
import ShopPage from "./Pages/ShopPage";
import CommunityPage from "./Pages/CommunityPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from './Pages/RegisterPage';


const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/character" element={<CharacterPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/information" element={<InformationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
