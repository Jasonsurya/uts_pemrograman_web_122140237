import React from 'react';
import { GalleryProvider } from '../contexts/GalleryContextGallery';
import UploadFormGallery from '../components/GalleryPage_Components/UploadFormGallery';
import GalleryGridGallery from '../components/GalleryPage_Components/GalleryGridGallery';

const GalleryPage = () => {
  return (
    <GalleryProvider>
      <div className="bg-black min-h-screen text-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-red-600 mb-6">Ultraverse Gallery</h1>
          <UploadFormGallery />
          <GalleryGridGallery />
        </div>
      </div>
    </GalleryProvider>
  );
};

export default GalleryPage;
