import React from 'react';
import { useGallery } from '../../contexts/GalleryContextGallery';
import { Heart, HeartOff } from 'lucide-react';

const LikeButtonGallery = ({ itemId }) => {
  const { toggleLike, gallery } = useGallery();
  const item = gallery.find((item) => item.id === itemId);

  if (!item) return null;

  return (
    <button
      onClick={() => toggleLike(itemId)}
      className={`flex items-center gap-1 mt-2 text-sm ${
        item.liked ? 'text-red-600' : 'text-gray-400'
      }`}
    >
      {item.liked ? <Heart className="w-4 h-4" /> : <HeartOff className="w-4 h-4" />}
      <span>{item.likes}</span>
    </button>
  );
};

export default LikeButtonGallery;
