// src/Components/GalleryPage_Components/GalleryGridGallery.jsx
import React from 'react';
import { useGallery } from '../../contexts/GalleryContextGallery';
import GalleryItemGallery from './GalleryItemGallery';

const GalleryGridGallery = () => {
  const { gallery } = useGallery();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {gallery.map((item) => (
        <GalleryItemGallery key={item.id} item={item} />
      ))}
    </div>
  );
};

export default GalleryGridGallery;
