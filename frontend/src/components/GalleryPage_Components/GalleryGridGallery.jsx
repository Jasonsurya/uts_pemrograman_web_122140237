import React from 'react';
import { useGallery } from '../../contexts/GalleryContextGallery';
import GalleryItemGallery from './GalleryItemGallery';

const GalleryGridGallery = () => {
  const { gallery } = useGallery();

  if (!Array.isArray(gallery)) {
    // Jika gallery belum siap atau bukan array, tampilkan loading atau kosongkan
    return <p className="text-white">Loading galeri...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {gallery.map((item) => (
        <GalleryItemGallery key={item.id} item={item} />
      ))}
    </div>
  );
};

export default GalleryGridGallery;
